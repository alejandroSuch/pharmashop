import { Observable } from 'rxjs/Observable';
import { User } from '../model/User';

export interface UserRepository {
  findById(id: string): Observable<User>;
  findByEmail(email: string): Observable<User>;
  save(user:User): Observable<void>;
}
