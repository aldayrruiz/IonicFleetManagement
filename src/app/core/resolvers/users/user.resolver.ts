import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { User } from 'src/app/core/models';
import { Key, LoadingService, StorageService, UserService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<User> {
  constructor(
    private readonly userSrv: UserService,
    private readonly storage: StorageService,
    private readonly loadingSrv: LoadingService
  ) {}

  async resolve(): Promise<User> {
    await this.loadingSrv.present();
    const user = await this.storage.getParsed(Key.user);
    return this.userSrv
      .get(user.id)
      .pipe(finalize(async () => await this.loadingSrv.dismiss()))
      .toPromise();
  }
}
