import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { ParentMessageInterface } from '../../../../../shared/interfaces/parentMessage.interface';
import { AccessValidationService } from '../../../../../shared/shared-module/services/access-validation.service';
import { ConvergenceService } from '../../../../../shared/shared-module/services/convergence.service';
import { ActiveStreamService } from '../../../../../shared/shared-module/services/active-stream.service';
import { StreamType } from '../../../../../shared/enums/stream-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  hasAccess = true;
  form!: UntypedFormGroup;
  value = '';
  streamType: StreamType = StreamType.Undefined;
  streamId: Guid = Guid.createEmpty();
  streamTypeQuery: string | null = null;
  streamIdQuery: string | null = '';

  constructor(
    private accessValidatorService: AccessValidationService,
    private convergenceService: ConvergenceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private activeStreamService: ActiveStreamService,
  ) {
  }

  ngOnInit(): void {
    // this.streamTypeQuery = this.activatedRoute.snapshot.paramMap.get('streamType');
    // this.streamIdQuery = this.activatedRoute.snapshot.paramMap.get('streamId');

    // if (this.streamIdQuery === null || !Guid.isGuid(this.streamIdQuery)) {
    //   throw new Error('Stream id is missing or has wrong type!');
    // }
    // this.streamId = Guid.parse(this.streamIdQuery);

    // if (this.streamTypeQuery === null
    //   || !Object.values(StreamType)
    //     .some((type: string) => type === this.streamTypeQuery && type !== StreamType.Undefined)) {
    //   throw new Error('Stream type is missing or has wrong type!');
    // }
    // this.streamType = <StreamType> this.streamTypeQuery;

    // this.activeStreamService.setStreamInfo(this.streamId, this.streamType);
    // this.convergenceService.setSessionId(this.streamId.toString());

    // window.addEventListener('message', (e: MessageEvent<ParentMessageInterface>) => {
    //   if (e.data.token) {
    //     this.hasAccess = this.accessValidatorService.hasAccess(e.data.token);
    //   }
    // });

    this.hasAccess = true;

    this.form = new UntypedFormGroup({
      userName: new UntypedFormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.value = this.form.value.userName.trim();
    if (this.value.length !== 0) {
      this.convergenceService.setUserName(this.value);
      switch (this.streamType) {
        case StreamType.Stream:
          this.router.navigate(['/stream']);
          break;
        case StreamType.Record:
          this.router.navigate(['/record']);
          break;
        case StreamType.Undefined:
        default:
          throw new Error('Stream type is missing or has wrong type!');
      }
    }
  }
}
