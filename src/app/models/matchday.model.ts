export class MatchDayModel{
    constructor(
        public number: number,
        public localTeam: string,
        public localGoals: number,
        public visitorTeam:string,
        public visitorGoals: number,
        public league: string,
        public user:string
    ){}
}