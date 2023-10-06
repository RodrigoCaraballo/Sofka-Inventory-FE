import { SocketApiService } from '../../infrastructure';

export class RegisterProductSocketUseCase {
  constructor(private readonly socketApiService: SocketApiService) {}
}
