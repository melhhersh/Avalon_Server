const gameState = {
    characters:{
        assassin:{
            "team": "evil",
            "image": "assassin"
        },
        lSA1:{
            "team": "good",
            "image": "LSA1"
        },
        lSA2:{
            "team": "good",
            "image": "LSA2"
        },
        lSA3:{
            "team": "good",
            "image": "LSA3"
        },
        lSA4:{
            "team": "good",
            "image": "LSA4"
        },
        merlin:{
            "team": "good",
            "image": "merlin"
        },
        mOM1:{
            "team": "evil",
            "image": "mOM1"
        },
        mordred:{
            "team": "evil",
            "image": "mordred"
        },
        morgana:{
            "team": "evil",
            "image": "morgana"
        },
        oberon:{
            "team": "evil",
            "image": "oberon"
        },
        percival:{
            "team": "good",
            "image": "percival"
        }
    },
    5:{
        characters: ['merlin', 'lSA1', 'lSA2', 'assassin','mOm1'],
        1:{
            voters: 2,
            status: '',
            votesToFail: 1,
        },
        2:{
            voters: 3,
            status: '',
            votesToFail: 1,
        },
        3:{
            voters: 2,
            status: '',
            votesToFail: 1,
        },
        4:{
            voters: 3,
            status: '',
            votesToFail: 1,
        },
        5:{
            voters: 3,
            status: '',
            votesToFail: 1,
        }
    },
    6:{
        characters: ['merlin', 'lSA2', 'lSA3','assassin', 'lSA1', 'mordred'],
        1:{
            voters: 2,
            status: '',
            votesToFail: 1,
        },
        2:{
            voters: 3,
            status: '',
            votesToFail: 1,
        },
        3:{
            voters: 4,
            status: '',
            votesToFail: 1,
        },
        4:{
            voters: 3,
            status: '',
            votesToFail: 1,
        },
        5:{
            voters: 4,
            status: '',
            votesToFail: 1,
        }
    },
    7:{
        characters: ['lSA1','mordred', 'lSA2', 'percival','assassin','merlin','mordred', 'morgana'],
        1:{
            voters: 2,
            status: '',
            votesToFail: 1,
        },
        2:{
            voters: 3,
            status: '',
            votesToFail: 1,
        },
        3:{
            voters: 3,
            status: '',
            votesToFail: 1,
        },
        4:{
            voters: 4,
            status: '',
            votesToFail: 2,
        },
        5:{
            voters: 4,
            status: '',
            votesToFail: 1,
        }
    },
    8:{
        characters: ['mordred','merlin', 'lSA1', 'lSA2', 'lSA3','percival','assassin','mordred','lSA1', 'lSA2', 'morgana'],
        1:{
            voters: 3,
            status: '',
            votesToFail: 1,
        },
        2:{
            voters: 4,
            status: '',
            votesToFail: 1,
        },
        3:{
            voters: 4,
            status: '',
            votesToFail: 1,
        },
        4:{
            voters: 5,
            status: '',
            votesToFail: 2,
        },
        5:{
            voters: 5,
            status: '',
            votesToFail: 1,
        }
    },
    9:{
        characters: ['assassin','lSA3', 'lSA4','percival','mordred', 'morgana','merlin', 'lSA1', 'lSA2'],
        1:{
            voters: 3,
            status: '',
            votesToFail: 1,
        },
        2:{
            voters: 4,
            status: '',
            votesToFail: 1,
        },
        3:{
            voters: 4,
            status: '',
            votesToFail: 1,
        },
        4:{
            voters: 5,
            status: '',
            votesToFail: 2,
        },
        5:{
            voters: 5,
            status: '',
            votesToFail: 1,
        }
    },
    10:{
        characters: ['lSA1', 'oberon', 'lSA3', 'lSA4','assassin','mordred', 'percival', 'morgana','merlin', 'lSA2'],
        1:{
            voters: 3,
            status: '',
            votesToFail: 1,
        },
        2:{
            voters: 4,
            status: '',
            votesToFail: 1,
        },
        3:{
            voters: 4,
            status: '',
            votesToFail: 1,
        },
        4:{
            voters: 5,
            status: '',
            votesToFail: 2,
        },
        5:{
            voters: 5,
            status: '',
            votesToFail: 1,
        }
    },
}

module.exports = gameState