export class TeamModel{
    constructor(
        public id:string,
        public name: string,
        public points: number,
        public goalsScored: number,
        public goalsAgainst: number,
        public goalsDifference: number,
        public matchesPlayed: number,
        public league: string,
        public user: string
    ){}
}