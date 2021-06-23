import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CookieManager } from 'src/app/services/cookie-manager.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private api: ApiService, private cookieManager: CookieManager) { }

  ngOnInit() {
    this.api.ping();
    const getData = this.findGetParameter('roomIds');
    if (getData === null) return;
    const newRoomIds: string[] = getData.split('|');
    const rooms = this.cookieManager.loadRooms();
    newRoomIds.filter(roomId => rooms.every(room => room.roomKey !== roomId)).forEach(roomId => this.api.getRoomSummary(roomId).then(
      result => this.cookieManager.addRoom(result.roomKey, result.name)
    ));
  }

  findGetParameter(parameterName) {
    let result = null,
      tmp = [];
    location.search.substr(1).split('&').forEach(item => {
      tmp = item.split('=');
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
    return result;
  }

}
