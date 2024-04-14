import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './model/session.entity'

@Injectable()
export class SessionService {
    constructor(
        @InjectRepository(Session)
        private sessionRepository: Repository<Session>,
    ) {}

    async createSession(sessionData: Partial<Session>): Promise<Session> {
        const session = this.sessionRepository.create({
           ...sessionData,
        });
        return await this.sessionRepository.save(session);
    }

    async getAllSessions(): Promise<Session[]> {
        return await this.sessionRepository.find();
    }

    async getSessionById(sessionId: string): Promise<any> {
        const session = await this.sessionRepository.find({
            where: { id: sessionId }
        });
        if (!session) {
            throw new NotFoundException(`Session with ID ${sessionId} not found`);
        }
        return session;
    }

    async updateSession(sessionId: string, updatedSession: Partial<Session>): Promise<Session> {
        const session = await this.sessionRepository.findOneBy({ id: sessionId });
        if (!session) {
            throw new NotFoundException(`Session with ID ${sessionId} not found`);
        }

        Object.assign(session, updatedSession);
        return await this.sessionRepository.save(session);
    }

    async deleteSession(sessionId: string): Promise<void> {
        const session = await this.sessionRepository.findOneBy({ id: sessionId });
        if (!session) {
            throw new NotFoundException(`Session with ID ${sessionId} not found`);
        }

        await this.sessionRepository.delete(sessionId);
    }
}