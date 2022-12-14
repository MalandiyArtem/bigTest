import { Injectable } from '@angular/core';
import { IViewerInfo } from '../../interfaces/viewerInfo.interface';

@Injectable({
  providedIn: 'root',
})
export class ViewersService {
  private viewerList: IViewerInfo[] = [
    {
      userName: 'Ivan Ivanov',
      canEdit: true,
    },
    // {
    //   userName: 'Artem Malandiy',
    //   canEdit: false,
    // },
    // {
    //   userName: 'Test profile',
    //   canEdit: false,
    // },
    // {
    //   userName: 'Anna Lorem',
    //   canEdit: false,
    // },
    // {
    //   userName: 'LoremipsumdolorsitametconsecteturadipiscingelitNullamnoncondimentumdiamacaccumsanfelisCrasorcienimornareetduiutdapibusnamdjgdshjeyufhaldfnsdiurfjsdfjf',
    //   canEdit: true,
    // },
    // {
    //   userName: 'Alex Zipper',
    //   canEdit: true,
    // },
    // {
    //   userName: 'Helena Artvither',
    //   canEdit: false,
    // },
    // {
    //   userName: 'American Resident',
    //   canEdit: false,
    // },
    // {
    //   userName: 'Something Else',
    //   canEdit: true,
    // },
    // {
    //   userName: 'Someone Else',
    //   canEdit: false,
    // },
    // {
    //   userName: 'Unknown Player',
    //   canEdit: false,
    // },
    // {
    //   userName: 'Cloudy Weather',
    //   canEdit: false,
    // },
    // {
    //   userName: 'Tiny Bunny',
    //   canEdit: true,
    // },
  ];

  getViewerListInfo(): IViewerInfo[] {
    return this.viewerList;
  }
}
