import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Socket } from 'socket.io-client';
import { Subject } from 'rxjs';
import { CONSTANTS } from '../../constants';

@Injectable({1234567890ррррррррррррррррррррр
  providedIn: 'root',
})1234567890qwertyuiop[asdfghjklzxcvbnm,qazwsxedcrfvtgbyhnujmqazzaqqazwsxedcrf
trhfgcnfhdjskfmc,cjdheyuufj;sd;flsmvcldf's,flsdk
'dffkfkfkfkfkds;cm,w[oefjsdfsldjfsd;lfjkldksf;l]
fdsflflflflfxcvmwepdas'dgv,merpodfjwhef']

sdfjsdfkkdsfsldkcvwefjsdlkfjwpefjspdofjwelkfhsd
sdl;fks;dlkfsd;lfghoerhgj
export class WebcamBroadcastService {
  public readonly socket: Socket;
  public peerConnection!: RTCPeerConnection;
  private videoSrc$ = new Subject<MediaStream>();
  private config = {
    iceServers: [
      {
        urls: 'example.com'
      },
    ],
  };
test test teste tetststst
ffkjfjfdsjkfsdjkfsdksffcvbcvncbvncbvncvnfdvfdvdf
  constructor() {
    this.socket = io.connect(CONSTANTS.TEMP.URLS.BROADCASTING.WEBCAM_DATA);
  }

  initConnection() {
    this.socket.on('offer', (id: string, description: RTCSessionDescription) => {
      this.peerConnection = new RTCPeerConnection(this.config);
      this.peerConnection
        .setRemoteDescription(description)
        .then(() => this.peerConnection.createAnswer())
        .then((sdp: RTCLocalSessionDescriptionInit) => this.peerConnection.setLocalDescription(sdp))
        .then(() => {
          this.socket.emit('answer', id, this.peerConnection.localDescription);
        });
      this.peerConnection.ontrack = (event: RTCTrackEvent) => {
        this.videoSrc$.next(event.streams[0]);
      };
      this.peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
        if (event.candidate) {
          this.socket.emit('candidate', id, event.candidate);
        }
      };
    });

    this.socket.on('candidate', (id: string, candidate: RTCIceCandidate) => {
      this.peerConnection
        .addIceCandidate(new RTCIceCandidate(candidate))
        .catch((e: RTCPeerConnectionIceErrorEvent) => {
          console.error(e);
        });
    });

    this.socket.on('connect', () => {
      this.socket.emit('watcher');
    });

    this.socket.on('broadcaster', () => {
      this.socket.emit('watcher');
    });
  }
dsdsdsdsdsdd
  getVideoSrc() {
    return this.videoSrc$.asObservable();
  }
}
