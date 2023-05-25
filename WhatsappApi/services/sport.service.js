const { sports,category,tournament,team,match } = require('../models');
const { Op } = require("sequelize");
const { to, TE, ReE } = require('../services/util.service'); 

const createSport = async (sportname,res) => {
    [err_sp, data_sp] = await to(sports.findOne({where: {SportName : sportname}}));
    if (!data_sp) {
        [err_sport, data_sport] = await to(sports.create({SportName : sportname}));
        if (err_sport) {
            ReE(res, "SportName Already Exist", 200);
        }
        else {
            return data_sport; 
        }
    }
    else{
        return data_sp; 
    }
}
module.exports.createSport = createSport;

const createCategory = async (catname,res) => {
    [err_cat, data_cat] = await to(category.findOne({where: {Name : catname}}));
    if (!data_cat) {
        [err_category, data_category] = await to(category.create({Name : catname}));
        if (err_category) {
            ReE(res, "Category Already Exist", 200);
        }
        else {
            return data_category; 
        }
    }
    else{
        return data_cat;
    }
}
module.exports.createCategory = createCategory;

const createTournament = async (tourdata,res) => {
    [err_tour, data_tour] = await to(tournament.findOne({where: {TourMatchID : tourdata.TourMatchID}}));
    if (!data_tour) {
        [err_tournament, data_tournament] = await to(tournament.create(tourdata));
        if (err_tournament) {
            ReE(res, "Category Already Exist", 200);
        }
        else {
            return data_tournament; 
        }
    }
    else{
        return data_tour;
    }
}
module.exports.createTournament = createTournament;

const createTeam = async (teamdata,res) => {
    [err_team, data_team] = await to(team.findOne({where: 
                                            {
                                                TeamName : teamdata.TeamName,
                                                GameID   : teamdata.GameID
                                            }
                                        }));
    
    if (!data_team) {
        [err_teamdata, data_teamdata] = await to(team.create(teamdata));
        if (err_teamdata) {
            ReE(res, "Category Already Exist", 200);
        }
        else {
            return data_teamdata; 
        }
    }
    else{
        return data_team;
    }
}
module.exports.createTeam = createTeam;

const createMatch = async (matchdata,res) => {
    let data_match ,err_match;
    let where = {
                    Team1: {
                        [Op.eq] : matchdata.Team1
                    },
                    Team2: {
                        [Op.eq] : matchdata.Team2
                    }
                };

    let wherenew = {
                    Team2: {
                        [Op.eq] : matchdata.Team1
                    },
                    Team1: {
                        [Op.eq] : matchdata.Team2
                    }
                };
                
    [err_match, data_match] = await to(match.findOne({
                                        where: {[Op.or]: [where,wherenew],
                                            [Op.and]: {
                                                TournamentID: matchdata.TournamentID,
                                                GameID: matchdata.GameID,
                                            }
                                        }
                                    }));

    if (!data_match) {
        [err_matchdata, data_matchdata] = await to(match.create(matchdata));
        if (err_matchdata) {
            ReE(res, "Category Already Exist", 200);
        }
        else {
            return data_matchdata; 
        }
    }
    else{
        let data = {
            Status: matchdata.Status,
            Matchstatus: matchdata.Matchstatus,
            updatedAt: new Date()
        }
        data_match.set(data);

        [err1, data_match] = await to(data_match.save());
        if (err1) {return ReE(res, err1);}
    }
}
module.exports.createMatch = createMatch;