import {
  AfterViewInit, Component, ElementRef, OnInit, ViewChild,
} from '@angular/core';
import * as monaco from 'monaco-editor';
import { MatSliderDragEvent } from '@angular/material/slider';
import { ActiveStreamService } from '../../../../../shared/shared-module/services/active-stream.service';
import { WebcamComponent } from '../../../../../shared/shared-module/components/webcam/webcam.component';
import { editorOptions } from '../../../../../shared/constants';
import { GithubService } from '../../../../../shared/shared-module/services/GitHub/github.service';
import { MonacoService } from '../../../../../shared/shared-module/services/Monaco/monaco.service';
import { RecordConfigService } from '../../../../../shared/shared-module/services/Record/record-config.service';
import { PlaybackService } from '../../../../../shared/shared-module/services/Record/playback.service';
import { TempStoreService } from '../../../../../shared/shared-module/services/Record/temp-store.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
})
export class RecordComponent implements OnInit, AfterViewInit {
  @ViewChild(WebcamComponent) webcamComponent: WebcamComponent | undefined;

  recordDurationSec = 0.00;
  recordDurationSecString = '00:00';
  currentTimePositionSec = 0.00;
  currentTimePositionSecString = '00:00';

  isPlaying = false;
  isMuted = false;

  currentFileName = '';

  timeSecToRewindCam = 0;

  webcamElement: ElementRef | undefined = undefined;

  sliderDisabled = false;

  constructor(
    private activeStreamService: ActiveStreamService,
    private gitHubService: GithubService,
    private monacoService: MonacoService,
    private recordConfigService: RecordConfigService,
    private playbackService: PlaybackService,
    private tempStoreService: TempStoreService,
  ) { }

  ngOnInit() {
    this.gitHubService.getRemoteTextOfFile().subscribe((data) => {
      if (data) {
        this.tempStoreService.setTempWholeText(data.path, data.text, true);
        this.monacoService.setWholeTextInMonaco(data.text);
      }
    });

    this.playbackService.currentOpenedFile$.subscribe((path) => {
      this.currentFileName = path || '';
    });

    this.playbackService.isPlaying$.subscribe((isPlaying) => {
      if (isPlaying === null) return;

      this.sliderDisabled = !isPlaying;
      this.onPlayPauseClick();
    });

    this.playbackService.playAgain$.subscribe((playAgain) => {
      if (playAgain) {
        this.tempStoreService.clearTemp();
        this.getConfig();
      }
    });
  }

  initCam(webcamRef: ElementRef | undefined) {
    if (webcamRef) {
      this.webcamElement = webcamRef;
    }
  }

  dragEnd(event: MatSliderDragEvent) {
    const timeToRewind = event.value < 0 ? 0 : event.value;

    if (timeToRewind > this.currentTimePositionSec) {
      this.playbackService.rewindForward(timeToRewind);
    } else if (timeToRewind < this.currentTimePositionSec) {
      this.playbackService.rewindBackward(this.currentTimePositionSec, timeToRewind);
    }

    if (this.webcamElement) {
      this.webcamElement.nativeElement.currentTime = timeToRewind;
    }
    this.currentTimePositionSec = timeToRewind;
    this.currentTimePositionSecString = this.getFormattedTime(timeToRewind);
  }

  formatLabel = (value: number) => this.getFormattedTime(value || 0);

  ngAfterViewInit(): void {
    const container = document.getElementById('monacoContainer');
    if (container) {
      const editor = monaco.editor.create(container, editorOptions);
      this.monacoService.setEditorInstance(editor, container);
    }

    this.getConfig();
  }

  onTimeSecUpdate(eventData: number) {
    this.playbackService.updateRealTime(Math.trunc(eventData * 1000));
    this.currentTimePositionSecString = this.getFormattedTime(eventData);
    this.currentTimePositionSec = eventData;
  }

  onPlayPauseClick() {
    this.isPlaying = !this.isPlaying;
    this.webcamComponent?.playPauseChange(this.isPlaying);
    if (this.isPlaying) {
      this.playbackService.playPlayback();
    } else {
      this.playbackService.pausePlayback();
    }
  }

  private getFormattedTime(inputValueSeconds: number): string {
    const time = new Date(0);
    time.setSeconds(inputValueSeconds);

    let hours: string | null = null;
    if (inputValueSeconds >= 3600) {
      hours = time.getHours().toString().padStart(2, '0');
    }

    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');

    return `${
      hours ? `${hours}:` : ''
    }${minutes}:${seconds}`;
  }

  onMuteClick() {
    this.isMuted = !this.isMuted;
  }

  onVideoEnded() {
    this.isPlaying = false;
  }

  private getConfig() {
    this.recordConfigService.getRecordConfigData().then((value) => {
      this.tempStoreService.setIdToFile(value.relativePath);

      this.recordDurationSecString = this.getFormattedTime(value.duration);
      this.recordDurationSec = value.duration;
      this.playbackService.setCommands(value.commands, value.relativePath);

      this.gitHubService.sendRequestToGetRemoteFileText(
        value.fileName,
        value.commitHash,
        value.ownerName,
        value.repoName,
      );
    });
  }
}
