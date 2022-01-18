import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FeedStore } from 'src/modules/feed/feed.store';
import { Room } from '../../room.model';
import { RoomStore } from '../../room.store';
import { RoomQueries } from '../../services/room.queries';
import { RoomService } from '../../services/room.service';
import { RoomSocketService } from '../../services/room.socket.service';
@Component({
  selector: 'app-room-menu',
  templateUrl: './room-menu.component.html',
  styleUrls: ['./room-menu.component.less']
})
export class RoomMenuComponent implements OnInit {
  roomId$: Observable<string | undefined>;

  rooms: Room[];
  router: Router;

  constructor(private feedStore: FeedStore, private queries: RoomQueries, private roomSocketService: RoomSocketService, private routerCo: Router) {
    this.roomId$ = feedStore.roomId$;
    this.rooms = [];
    this.router = routerCo;
  }

  async ngOnInit() {
    this.rooms = await this.queries.getAll();
  }

  goToRoom(room: Room) {
    // TODO naviguer vers app/[id de la room]
    this.router.navigate(["app/"+room.id]);
  }
}
