import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  ChangeCommand,
  ChangeFileCommand,
  EndCommand,
  RecordedCodeCommands,
} from '../../../interfaces/Records/recorded-code-commands.interface';
import { MonacoService } from '../Monaco/monaco.service';
import { TempStoreService } from './temp-store.service';
import { GithubService } from '../GitHub/github.service';
import { RecordConfigService } from './record-config.service';
import { FileContentService } from '../file-content.service';
import { ChangeEvent } from '../../../enums/change-event';

@Injectable({
  providedIn: 'root',
})
export class PlaybackService {
  currentOpenedFile$ = new BehaviorSubject<string | undefined>('');
  playAgain$ = new BehaviorSubject<boolean>(false);
  isPlaying$ = new BehaviorSubject<boolean | null>(null);

  private prevCommandPath = '';
  private commandsJsn?: RecordedCodeCommands;
  private lastProducedCommand: (EndCommand | ChangeFileCommand | ChangeCommand) | null = null;
  private isPlaybackEnded = false;
  private prevCommandTime = 0;
  private realTime = 0;
  private isPaused = true;

  constructor(
    private monacoService: MonacoService,
    private tempStoreService: TempStoreService,
    private gitHubService: GithubService,
    private recordConfigService: RecordConfigService,
    private fileContentService: FileContentService,
  ) {
  }

  setCommands(commands: RecordedCodeCommands, relativePath: string) {
    this.commandsJsn = commands;
    this.prevCommandPath = relativePath;
    this.setCurrentOpenedFile(relativePath);
  }

  setCurrentOpenedFile(path: string) {
    this.currentOpenedFile$.next(path);
  }

  playPlayback() {
    this.isPaused = false;
    if (this.isPlaybackEnded) {
      this.isPlaybackEnded = false;
      this.playAgain$.next(true);
    }
    this.playCommands();
  }

  pausePlayback() {
    this.isPaused = true;
  }

  stopPlayback() {
    this.prevCommandTime = 0;
    this.isPlaybackEnded = true;
    this.prevCommandPath = '';
    this.lastProducedCommand = null;
  }

  updateRealTime(real: number) {
    this.realTime = real;
    this.playCommands();
  }

  private playCommands() {
    const command: (EndCommand | ChangeFileCommand | ChangeCommand) | undefined = this.commandsJsn?.commands.filter((cmd) => cmd.changeTime
      && cmd.changeTime <= this.realTime
      && cmd.changeTime > this.prevCommandTime)[0];

    if (command) {
      this.lastProducedCommand = command;
      this.prevCommandTime = command.changeTime;
      this.playForward(command, false);
    }
  }

  async rewindForward(endTimeSec: number) {
    this.isPlaying$.next(false);
    const endMilisec = this.secToMilisec(endTimeSec);
    const lastCmd = this.lastProducedCommand;

    const gapLastAndEndCommand = this.commandsJsn?.commands.filter((cmd) => {
      if (lastCmd) {
        return cmd.changeTime
          && cmd.changeTime <= endMilisec
          && cmd.changeTime > lastCmd.changeTime;
      }
      return cmd.changeTime
        && cmd.changeTime <= endMilisec;
    });

    if (!gapLastAndEndCommand) return;

    for (const command of gapLastAndEndCommand) {
      this.lastProducedCommand = command;
      this.prevCommandTime = command.changeTime;
      await this.playForward(command, true);
    }
    this.isPlaying$.next(true);
  }

  rewindBackward(currentTimeSec: number, rewindEndTimeSec: number) {
    this.isPlaying$.next(false);
    const rewindEndMilisec = this.secToMilisec(rewindEndTimeSec);
    const lastCmd = this.lastProducedCommand;

    const gapLastAndEndCommand = this.commandsJsn?.commands.filter((cmd) => {
      if (lastCmd) {
        return cmd.changeTime
          && cmd.changeTime >= rewindEndMilisec
          && cmd.changeTime <= lastCmd.changeTime;
      }
      return cmd.changeTime && cmd.changeTime <= currentTimeSec;
    });

    this.playBackward(gapLastAndEndCommand).then(() => {
      this.isPlaying$.next(true);
    });
  }

  private async playBackward(commands: (EndCommand | ChangeCommand | ChangeFileCommand)[] | undefined) {
    if (!commands) return;

    const reversedCommands = commands.reverse();

    for (const command of reversedCommands) {
      this.prevCommandTime = command.changeTime - 10 < 0 ? 0 : command.changeTime - 10;
      switch (command.event) {
        case ChangeEvent.end:
          this.stopPlayback();
          return;
        case ChangeEvent.changeFile: {
          if ('path' in command && 'event' in command && 'changeTime' in command) {
            this.currentOpenedFile$.next(command.path);
            this.lastProducedCommand = command;
            this.prevCommandPath = command.path;
            const wholeTextOfOpenedFileMonaco = await this.monacoService.getWholeTextFromMonaco();
            await this.tempStoreService.setTempWholeText(this.prevCommandPath, wholeTextOfOpenedFileMonaco || '');
          }
          break;
        }
        case ChangeEvent.insert: {
          if ('position' in command) {
            if (this.lastProducedCommand?.event === ChangeEvent.changeFile && this.prevCommandPath !== command.path) {
              this.currentOpenedFile$.next(command.path);
              await this.tempStoreService.getContentFromTemp(command.path).then(async (data) => {
                await this.monacoService.setWholeTextInMonaco(data.text || '');
              });
            }

            this.lastProducedCommand = command;
            this.prevCommandPath = command.path;

            if (command.text === '\r\n') {
              const newCommand = {
                ...command,
                text: '',
                position: {
                  lineStart: command.position.lineStart,
                  charStart: command.position.charStart,
                  lineEnd: command.position.lineEnd + 1,
                  charEnd: 1,
                },
              };
              this.monacoService.setPlaybackValueInMonaco(newCommand, true);
              break;
            }

            if (command.text.includes('\r\n')) {
              const splitText = command.text.split('\r\n');
              const newCommand = {
                ...command,
                text: '',
                position: {
                  lineStart: command.position.lineStart,
                  charStart: command.position.charStart,
                  lineEnd: command.position.lineEnd + splitText.length - 1,
                  charEnd: splitText[splitText.length - 1].length + 1,
                },
              };
              this.monacoService.setPlaybackValueInMonaco(newCommand, true);
              break;
            }

            if (command.text !== '') {
              const newCommand = {
                ...command,
                text: '',
                position: {
                  lineStart: command.position.lineStart,
                  charStart: command.position.charStart,
                  lineEnd: command.position.lineEnd,
                  charEnd: command.position.charEnd + command.text.length,
                },
              };
              this.monacoService.setPlaybackValueInMonaco(newCommand, true);
              break;
            }
          }
          break;
        }
        case ChangeEvent.remove:
          if ('path' in command && 'position' in command) {
            if (this.lastProducedCommand?.event === ChangeEvent.changeFile && this.prevCommandPath !== command.path) {
              this.currentOpenedFile$.next(command.path);
              await this.tempStoreService.getContentFromTemp(command.path).then(async (data) => {
                await this.monacoService.setWholeTextInMonaco(data.text || '');
              });
            }

            this.prevCommandPath = command.path;
            this.lastProducedCommand = command;

            const newCommand = {
              ...command,
              text: command.text,
              position: {
                lineStart: command.position.lineStart,
                charStart: command.position.charStart,
                lineEnd: command.position.lineStart,
                charEnd: command.position.charStart,
              },
            };
            this.monacoService.setPlaybackValueInMonaco(newCommand, false);
          }
          break;
        default:
          break;
      }
    }
  }

  private async playForward(command: EndCommand | ChangeCommand | ChangeFileCommand, isRewind?: boolean) {
    switch (command.event) {
      case ChangeEvent.end:
        this.stopPlayback();
        return;
      case ChangeEvent.changeFile: {
        if ('path' in command && 'event' in command && 'changeTime' in command) {
          this.currentOpenedFile$.next(command.path);

          const wholeTextOfOpenedFileMonaco = this.monacoService.getWholeTextFromMonaco();
          this.tempStoreService.setTempWholeText(this.prevCommandPath, wholeTextOfOpenedFileMonaco || '');

          await this.tempStoreService.getContentFromTemp(command.path).then(async (data) => {
            if (data.hasTempContent) {
              this.monacoService.setWholeTextInMonaco(data.text || '');
            } else {
              const pathForGit = data.path.split('\\');
              pathForGit.shift();

              if (isRewind) {
                const remote = await this.gitHubService.getTextForRewind(
                  pathForGit.join('\\'),
                  this.recordConfigService.config.commitHash,
                  this.recordConfigService.config.ownerName,
                  this.recordConfigService.config.repoName,
                );
                const textOfFile = this.fileContentService.decodeContent(remote?.content, remote?.encoding);
                this.tempStoreService.setTempWholeText(remote?.path, textOfFile, true);
                this.monacoService.setWholeTextInMonaco(textOfFile);
              } else {
                this.gitHubService.sendRequestToGetRemoteFileText(
                  pathForGit.join('\\'),
                  this.recordConfigService.config.commitHash,
                  this.recordConfigService.config.ownerName,
                  this.recordConfigService.config.repoName,
                );
              }
            }
          });
        }
        break;
      }
      case ChangeEvent.insert:
        if ('position' in command) {
          this.monacoService.setPlaybackValueInMonaco(command);
          this.prevCommandPath = command.path;
        }
        break;
      case ChangeEvent.remove:
        if ('position' in command) {
          this.monacoService.setPlaybackValueInMonaco(command, true);
          this.prevCommandPath = command.path;
        }
        break;
      default:
        break;
    }
  }

  private secToMilisec(sec: number) {
    return sec * 1000;
  }
}
