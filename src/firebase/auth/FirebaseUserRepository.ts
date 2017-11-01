import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User } from '../../domain/auth/model/User';
import { UserRepository } from '../../domain/auth/repository/UserRepository';

export const USERS_COLLECTION_NAME = 'users';

@Injectable()
export class FirebaseUserRepository implements UserRepository {
  constructor(private afs: AngularFirestore) {

  }

  findById(id: String): Observable<User> {
    return this.afs.doc<User>(`${USERS_COLLECTION_NAME}/${id}`).valueChanges();
  }

  findByEmail(email: String): Observable<User> {
    const queryFn = ref => ref.where('email', '==', email);

    const mapFn = (users: User[]) => {
      if (users.length === 0) {
        throw new Error('User not found');
      }

      return users[0];
    };

    return this.afs
               .collection<User>(USERS_COLLECTION_NAME, queryFn)
               .valueChanges()
               .map(mapFn);
  }

  save(user: User): Observable<void> {
    return Observable.fromPromise(
      this.afs.doc(`users/${user.id}`).set(user)
    );
  }
}
