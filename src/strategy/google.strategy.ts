import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: '351460226914-1qesepveqt5qpu24ka9cba47hhr0ljhq.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3333/auth/google/callback',
      passReqToCallback: true,
      scope: ['profile', 'email'],
    }); 
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const user = {
        id: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
}
