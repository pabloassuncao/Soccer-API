export const LOGIN_ROUTE = '/login';
export const LOGIN_VALIDATE_ROUTE = '/login/validate';

export const ADMIN_USER = {
  id: 1,
  username: "Admin",
  role: "admin",
  email: "admin@admin.com",
  password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW",
}

export const ClubsFindAllResponse = [
  {
    id: 1,
    clubName: 'Avaí/Kindermann',
  },
  {
    id: 2,
    clubName: 'Bahia',
  },
  {
    id: 3,
    clubName: 'Botafogo',
  },
  {
    id: 4,
    clubName: 'Corinthians',
  },
  {
    id: 5,
    clubName: 'Cruzeiro',
  },
  {
    id: 6,
    clubName: 'Palmeiras',
  },
  {
    id: 7,
    clubName: 'Flamengo',
  }
]

export const FindAllClubsWithMatchesResponse = [
	{
		id: 12,
		clubName: 'Palmeiras',
		awayTeam: [
			{
				id: 9,
				homeTeam: 1,
				homeTeamGoals: 0,
				awayTeam: 12,
				awayTeamGoals: 3,
				inProgress: false
			},
			{
				id: 30,
				homeTeam: 3,
				homeTeamGoals: 0,
				awayTeam: 12,
				awayTeamGoals: 4,
				inProgress: false
			},
			{
				id: 46,
				homeTeam: 4,
				homeTeamGoals: 1,
				awayTeam: 12,
				awayTeamGoals: 1,
				inProgress: true
			}
		],
		homeTeam: [
			{
				id: 7,
				homeTeam: 12,
				homeTeamGoals: 2,
				awayTeam: 6,
				awayTeamGoals: 2,
				inProgress: false
			},
			{
				id: 18,
				homeTeam: 12,
				homeTeamGoals: 4,
				awayTeam: 5,
				awayTeamGoals: 2,
				inProgress: false
			},
			{
				id: 40,
				homeTeam: 12,
				homeTeamGoals: 4,
				awayTeam: 8,
				awayTeamGoals: 1,
				inProgress: false
			}
		]
	},
	{
		id: 4,
		clubName: 'Corinthians',
		awayTeam: [
			{
				id: 12,
				homeTeam: 6,
				homeTeamGoals: 0,
				awayTeam: 4,
				awayTeamGoals: 1,
				inProgress: false
			},
			{
				id: 29,
				homeTeam: 9,
				homeTeamGoals: 0,
				awayTeam: 4,
				awayTeamGoals: 4,
				inProgress: false
			},
			{
				id: 38,
				homeTeam: 14,
				homeTeamGoals: 2,
				awayTeam: 4,
				awayTeamGoals: 1,
				inProgress: false
			}
		],
		homeTeam: [
			{
				id: 3,
				homeTeam: 4,
				homeTeamGoals: 3,
				awayTeam: 11,
				awayTeamGoals: 0,
				inProgress: false
			},
			{
				id: 22,
				homeTeam: 4,
				homeTeamGoals: 3,
				awayTeam: 3,
				awayTeamGoals: 1,
				inProgress: false
			},
			{
				id: 46,
				homeTeam: 4,
				homeTeamGoals: 1,
				awayTeam: 12,
				awayTeamGoals: 1,
				inProgress: true
			},
			{
				id: 49,
				homeTeam: 4,
				homeTeamGoals: 2,
				awayTeam: 9,
				awayTeamGoals: 1,
				inProgress: false
			}
		]
	},
	{
		id: 14,
		clubName: 'Santos',
		awayTeam: [
			{
				id: 2,
				homeTeam: 9,
				homeTeamGoals: 1,
				awayTeam: 14,
				awayTeamGoals: 1,
				inProgress: false
			},
			{
				id: 24,
				homeTeam: 10,
				homeTeamGoals: 2,
				awayTeam: 14,
				awayTeamGoals: 2,
				inProgress: false
			},
			{
				id: 47,
				homeTeam: 8,
				homeTeamGoals: 1,
				awayTeam: 14,
				awayTeamGoals: 2,
				inProgress: true
			}
		],
		homeTeam: [
			{
				id: 14,
				homeTeam: 14,
				homeTeamGoals: 2,
				awayTeam: 16,
				awayTeamGoals: 1,
				inProgress: false
			},
			{
				id: 32,
				homeTeam: 14,
				homeTeamGoals: 5,
				awayTeam: 11,
				awayTeamGoals: 1,
				inProgress: false
			},
			{
				id: 38,
				homeTeam: 14,
				homeTeamGoals: 2,
				awayTeam: 4,
				awayTeamGoals: 1,
				inProgress: false
			}
		]
	},
];


export interface IMatchesFindAllResponse {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  awayClub: {
    id: number,
    clubName: string,
  },
  homeClub: {
    id: number,
    clubName: string,
  }
}

export const MatchesCreateResponse = {
  id: 14,
  homeTeam: 12,
  homeTeamGoals: 5,
  awayTeam: 4,
  awayTeamGoals: 1,
  inProgress: true,
}

export const NewMatchFindByIdResponse = {
  id: 14,
  homeTeam: 12,
  homeTeamGoals: 5,
  awayTeam: 4,
  awayTeamGoals: 1,
  inProgress: true,
  awayClub: {
    id: 4,
    clubName: 'Corinthians',
  },
  homeClub: {
    id: 12,
    clubName: 'Palmeiras',
  }
}

export class FinishMatchResponse {
  id= 14;
  homeTeam= 12;
  homeTeamGoals= 5;
  awayTeam= 4;
  awayTeamGoals= 1;
  inProgress= true;
  awayClub= {
    id: 4,
    clubName: 'Corinthians',
  };
  homeClub= {
    id: 12,
    clubName: 'Palmeiras',
  }

	public toJSON() {
		return {
			id: this.id,
			homeTeam: this.homeTeam,
			homeTeamGoals: this.homeTeamGoals,
			awayTeam: this.awayTeam,
			awayTeamGoals: this.awayTeamGoals,
			inProgress: this.inProgress,
			awayClub: {
				id: this.awayClub.id,
				clubName: this.awayClub.clubName,
			},
			homeClub: {
				id: this.homeClub.id,
				clubName: this.homeClub.clubName,
			}
		}
	}
}

export class UpdatedMatchResponse {
  id= 14;
  homeTeam= 12;
  homeTeamGoals= 10;
  awayTeam= 4;
  awayTeamGoals= 0;
  inProgress= true;
  awayClub= {
    id: 4,
    clubName: 'Corinthians',
  };
  homeClub= {
    id: 12,
    clubName: 'Palmeiras',
  }

	constructor(homeTeamGoals: number, awayTeamGoals: number, inProgress: boolean) {
		this.homeTeamGoals = homeTeamGoals;
		this.awayTeamGoals = awayTeamGoals;
		this.inProgress = inProgress;
	}

	public toJSON() {
		return {
			id: this.id,
			homeTeam: this.homeTeam,
			homeTeamGoals: this.homeTeamGoals,
			awayTeam: this.awayTeam,
			awayTeamGoals: this.awayTeamGoals,
			inProgress: this.inProgress,
			awayClub: {
				id: this.awayClub.id,
				clubName: this.awayClub.clubName,
			},
			homeClub: {
				id: this.homeClub.id,
				clubName: this.homeClub.clubName,
			}
		}
	}
}

export const MatchesFindAllResponse = [
	{
		id: 1,
		homeTeam: 16,
		homeTeamGoals: 1,
		awayTeam: 8,
		awayTeamGoals: 1,
		inProgress: false,
		awayClub: {
			id: 8,
			clubName: 'Grêmio'
		},
		homeClub: {
			id: 16,
			clubName: 'São Paulo'
		}
	},
	{
		id: 2,
		homeTeam: 9,
		homeTeamGoals: 1,
		awayTeam: 14,
		awayTeamGoals: 1,
		inProgress: false,
		awayClub: {
			id: 14,
			clubName: 'Santos'
		},
		homeClub: {
			id: 9,
			clubName: 'Internacional'
		}
	},
	{
		id: 3,
		homeTeam: 4,
		homeTeamGoals: 3,
		awayTeam: 11,
		awayTeamGoals: 0,
		inProgress: false,
		awayClub: {
			id: 11,
			clubName: 'Napoli-SC'
		},
		homeClub: {
			id: 4,
			clubName: 'Corinthians'
		}
	},
	{
		id: 4,
		homeTeam: 3,
		homeTeamGoals: 0,
		awayTeam: 2,
		awayTeamGoals: 0,
		inProgress: false,
		awayClub: {
			id: 2,
			clubName: 'Bahia'
		},
		homeClub: {
			id: 3,
			clubName: 'Botafogo'
		}
	},
	{
		id: 5,
		homeTeam: 7,
		homeTeamGoals: 1,
		awayTeam: 10,
		awayTeamGoals: 1,
		inProgress: false,
		awayClub: {
			id: 10,
			clubName: 'Minas Brasília'
		},
		homeClub: {
			id: 7,
			clubName: 'Flamengo'
		}
	},
	{
		id: 6,
		homeTeam: 5,
		homeTeamGoals: 1,
		awayTeam: 13,
		awayTeamGoals: 1,
		inProgress: false,
		awayClub: {
			id: 13,
			clubName: 'Real Brasília'
		},
		homeClub: {
			id: 5,
			clubName: 'Cruzeiro'
		}
	},
	{
		id: 7,
		homeTeam: 12,
		homeTeamGoals: 2,
		awayTeam: 6,
		awayTeamGoals: 2,
		inProgress: false,
		awayClub: {
			id: 6,
			clubName: 'Ferroviária'
		},
		homeClub: {
			id: 12,
			clubName: 'Palmeiras'
		}
	},
]

export const MatchesFindAllTrueResponse = [
	{
		id: 1,
		homeTeam: 16,
		homeTeamGoals: 1,
		awayTeam: 8,
		awayTeamGoals: 1,
		inProgress: true,
		awayClub: {
			id: 8,
			clubName: 'Grêmio'
		},
		homeClub: {
			id: 16,
			clubName: 'São Paulo'
		}
	},
	{
		id: 2,
		homeTeam: 9,
		homeTeamGoals: 1,
		awayTeam: 14,
		awayTeamGoals: 1,
		inProgress: true,
		awayClub: {
			id: 14,
			clubName: 'Santos'
		},
		homeClub: {
			id: 9,
			clubName: 'Internacional'
		}
	},
	{
		id: 3,
		homeTeam: 4,
		homeTeamGoals: 3,
		awayTeam: 11,
		awayTeamGoals: 0,
		inProgress: true,
		awayClub: {
			id: 11,
			clubName: 'Napoli-SC'
		},
		homeClub: {
			id: 4,
			clubName: 'Corinthians'
		}
	},
]

export const HTTP_OK_STATUS = 200;
export const HTTP_CREATED_STATUS = 201;
export const HTTP_OK_NO_CONTENT_STATUS = 204;
export const HTTP_BAD_REQUEST_STATUS = 400;
export const HTTP_UNAUTHORIZED_STATUS = 401;
export const HTTP_NOT_FOUND_STATUS = 404;
export const HTTP_CONFLICT_STATUS = 409;
export const HTTP_UNPROCCESSABLE_ENTITY_STATUS = 422;
export const HTTP_INTERNAL_SERVER_ERROR_STATUS = 500;
