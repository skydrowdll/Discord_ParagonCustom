
const Discord = require("discord.js");
const PREFIX = ".";
const IMAGESERVER = "http://www.ultimecode.com/DiscordBot/ultimecode.png";
const IMAGECUSTOM = "http://www.ultimecode.com/DiscordBot/custom.png";


var bot = new Discord.Client();
var placelibre = 10;
var players = [];
var elos = [];

bot.on("ready", function() {
    console.log("Bot Created By Black Snow.");
});



bot.on("message", function(message){

    if( message.author.equals(bot.user)) return;

    if(!message.content.startsWith(PREFIX))return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0].toLocaleLowerCase()){

        case "agora":

            if(isEmpty(args[1])){
                message.channel.sendMessage(message.author+" pour voir ton profile sur agora écris      .agora nom-in-game    ");
            }else{
                if(!isEmpty(args[2])){
                    message.channel.sendMessage(message.author+" profile agora : https://agora.gg/search/"+args[1]+"%20"+args[2]);
                }else{
                    message.channel.sendMessage(message.author+" profile agora : https://agora.gg/search/"+args[1]);
                }
            }
            break;

        case "start":

            var embed = new Discord.RichEmbed()
            .addField("La Creation du custom commence!","Pour lancer ou rejoindre la custom écris      .custom elo    ",true)
            .setColor(0x00FFFF)
            .setFooter("Created By Black Snow | Ultimecode.com © 2017", IMAGESERVER)
            message.channel.sendEmbed(embed);
            break;

        case "help":

            var embed = new Discord.RichEmbed()
            .setTitle("")
           .addField("Commandes",".help\n.info\n.list\n.clear\n.agora nom-in-game\n.custom elo\n.exit\n.modif nouveau-elo\n.average elo(x5)",true)
            .addField("Descriptions","Menu d'aide. \nComment lancer le custom. \nVoir les joueurs inscrits au custom. \nAnnuler le custom.\nRécuperer son elo.\nJoindre un custom.\nSortir du custom.\nModifier son elo. \nex: .average 1550 1520 1510 1530 1520",true)
            .setColor(0x00FFFF)
            //.setImage(img)
            .setFooter("Created By Black Snow| Ultimecode.com © 2017", IMAGESERVER)
            message.channel.sendEmbed(embed);
            break;

        case "exit":
         
            var pos = players.indexOf(message.author.username);
            var userexist = contains.call(players, message.author.username);
            console.log("Delete user "+message.author.username);
            if(userexist){
                console.log("Delete from "+pos);
                if (pos > -1) {
                    for(var i = 0; i<=players.length; i++){
                       if(players[i] === message.author.username) {
                            players.splice(i, 1);
                            elos.splice(i, 1);
                        }
                    }
                 placelibre +=1;
                 message.channel.sendMessage(message.author+" est sortis du custom, il reste "+placelibre+" places de libre pour ce custom.");
                 break;
                }
            }else{
                console.log(" user: "+message.author+ "exist!");
                message.channel.sendMessage(message.author+" vous n'êtes pas inscrits au custom.");
                break;
            }
            break;

        case "average":

            if( isEmpty(args[1]) || isEmpty(args[2]) || isEmpty(args[3]) || isEmpty(args[4]) || isEmpty(args[5]) ){
                message.channel.sendMessage(message.author+" pour ajouter un average écris      .average elo(x5) ");
            }else{
                if(args[1].isNumber()  && args[2].isNumber()  && args[3].isNumber() && args[4].isNumber()  && args[5].isNumber() ){
                	total =  parseInt(args[1]) + parseInt(args[2]) + parseInt(args[3]) + parseInt(args[4]) + parseInt(args[5]);
                    var totalelo = total / parseInt(5);
                    if(totalelo > 0 ){img = "http://www.ultimecode.com/paragon/images/bronze.png";}
                    if(totalelo > 1100 ){img = "http://www.ultimecode.com/paragon/images/silver.png";}
                    if(totalelo > 1300 ){img = "http://www.ultimecode.com/paragon/images/gold.png";}
                    if(totalelo > 1500 ){img = "http://www.ultimecode.com/paragon/images/plate.png";}
                    if(totalelo > 1700 ){img = "http://www.ultimecode.com/paragon/images/diamond.png";}
                    if(totalelo > 2200 ){img = "http://www.ultimecode.com/paragon/images/master.png";}
                    console.log("TOTAL: "+totalelo);
                     var embed = new Discord.RichEmbed()
			            .addField("Average",parseInt(totalelo),true)
			   			.setImage(img)
			            .setColor(0x00FFFF)
			            .setFooter("Created By Black Snow | Ultimecode.com © 2017", IMAGESERVER)
			            message.channel.sendEmbed(embed);
                }else{
                    message.channel.sendMessage(message.author+" pour ajouter un average écris      .average elo(x5) ");
                }
            }
            break;

        case "modif":
            var pos = players.indexOf(message.author.username);
            var userexist = contains.call(players, message.author.username);
            if(userexist){
                console.log("Modif from "+pos);
                if (pos > -1) {
                    for(var i = 0; i<=players.length; i++){
                       if(players[i] === message.author.username) {
                            //players.splice(i, 1);
                            //elos.splice(i, 1);
                            elos[i]=args[1];
                        }
                    }
                 message.channel.sendMessage(message.author+" a modifié son elo a "+args[1]);
                 ///// LIST ////
                var joueurs = "";
                var eloa = "";
                playerLen = players.length;
                separator = "\n";
                for (i = 0; i < playerLen; i++) {
                    if( !isEmpty(players[i]) || players[i]==""){
                        joueurs += players[i]+separator;
                    }else{
                        joueurs += "-"+separator;
                    }
                    if( !isEmpty(elos[i]) || elos[i]==""){
                        eloa += parseInt(elos[i])+separator;
                    }else{
                        eloa += "-"+separator;
                    }
                }

                var embed = new Discord.RichEmbed()
                .setTitle("")
                .setImage(IMAGECUSTOM)
                .setAuthor("Liste des joueurs", IMAGESERVER)
                .addField("Joueurs",""+joueurs+"",true)
                .addField("Elo",""+eloa+"",true)
                .setColor(0x00FFFF)
                .setFooter("Created By Black Snow | Ultimecode.com © 2017", IMAGESERVER)
                message.channel.sendEmbed(embed);
                 break;
                }
            }else{
                console.log(" user: "+message.author+ "exist!");
                message.channel.sendMessage(message.author+" vous n'êtes pas inscrits au custom.");
                break;
            }
            break;
            
        case "info":

            message.channel.sendMessage(message.author+" pour lancer ou rejoindre le custom écris      .custom elo    ");
            break;

        case "annonce":
           
            message.channel.sendMessage(" ");
            var embed = new Discord.RichEmbed()
            .addField("Custom Creator","Un custom est lancé, pour rejoindre le custom écrivez      .custom elo",true)
            .setColor(0x00FFFF)
            .setFooter("Created By Black Snow | Ultimecode.com © 2017", IMAGESERVER)
            message.channel.sendEmbed(embed);
            break;

        case "clear":
            
            Cleared();
            message.channel.sendMessage("Custom Annulé");
            break;

        case "list":

            if(players.length==0){
                message.channel.sendMessage("! Aucun Custom lancé !");
                message.channel.sendMessage(message.author+" pour lancer ou rejoindre le custom écris      .custom elo    ");
            }else{
                var joueurs = "";
                var eloa = "";
                playerLen = players.length;
                separator = "\n";
                for (i = 0; i < playerLen; i++) {
                    if( !isEmpty(players[i]) || players[i]==""){
                        joueurs += players[i]+separator;
                    }else{
                        joueurs += "-"+separator;
                    }
                    
                    if( !isEmpty(elos[i]) || elos[i]==""){
                        eloa += parseInt(elos[i])+separator;
                    }else{
                        eloa += "-"+separator;
                    }
                }
                var embed = new Discord.RichEmbed()
                .setTitle("")
                .setImage(IMAGECUSTOM)
                .setAuthor("Liste des joueurs", IMAGESERVER)
                .addField("Joueurs",""+joueurs+"",true)
                .addField("Elo",""+eloa+"",true)
                .setColor(0x00FFFF)
                .setFooter("Created By Black Snow | Ultimecode.com © 2017", IMAGESERVER)
                message.channel.sendEmbed(embed);
            }
            break;

        case "custom":
            if(isEmpty(args[1])  ){
                message.channel.sendMessage(message.author+" pour lancer ou rejoindre le custom écris      .custom elo    ");
            }else{
                var userexist = contains.call(players, message.author.username);
                if(userexist){
                    console.log(" user: "+message.author+ "exist!");
                    break;
                }
                if(args[1].isNumber() ){
                    placelibre = placelibre-1;
                    if(placelibre == 1){
                        message.channel.sendMessage("Merci de votre participation "+message.author+", il ne reste plus que "+placelibre+" place de libre pour ce custom.");
                        elos[placelibre]=args[1];
                        players[placelibre]=message.author.username

                        var joueurs = "";
                        var eloa = "";
                        playerLen = players.length;
                        separator = "\n";
                        for (i = 0; i < playerLen; i++) {
                            if( !isEmpty(players[i]) || players[i]==""){
                                joueurs += players[i]+separator;
                            }else{
                                joueurs += "-"+separator;
                            }
                            
                            if( !isEmpty(elos[i]) || elos[i]==""){
                                eloa += parseInt(elos[i])+separator;
                            }else{
                                eloa += "-"+separator;
                            }
                        }

                        var embed = new Discord.RichEmbed()
                        .setTitle("")
                        .setImage(IMAGECUSTOM)
                        .setAuthor("Liste des joueurs", IMAGESERVER)
                        .addField("Joueurs",""+joueurs+"",true)
                        .addField("Elo",""+eloa+"",true)
                        .setColor(0x00FFFF)
                        .setFooter("Created By Black Snow | Ultimecode.com © 2017", IMAGESERVER)
                        message.channel.sendEmbed(embed);
                


                    }else{

                        if(placelibre<0){
                            message.channel.sendMessage("Désolé "+message.author+" le custom est terminé, si tu desire créer un nouveau custom écrits ( .clear ) ensuite ( .custom elo ).");
                            break;
                        }

                        if(placelibre==0){
                            message.channel.sendMessage("Merci de votre participation "+message.author+", le Custom est terminé.");
                            players[placelibre]=message.author.username
                            elos[placelibre]=args[1];
                            

                            ///// LIST ////
                                var joueurs = "";
                                var eloa = "";
                                playerLen = players.length;
                                separator = "\n";
                                for (i = 0; i < playerLen; i++) {
                                    if( !isEmpty(players[i]) || players[i]==""){
                                        joueurs += players[i]+separator;
                                    }else{
                                        joueurs += "-"+separator;
                                    }
                                    
                                    if( !isEmpty(elos[i]) || elos[i]==""){
                                        eloa += parseInt(elos[i])+separator;
                                    }else{
                                        eloa += "-"+separator;
                                    }
                                }

                                var embed = new Discord.RichEmbed()
                                .setTitle("")
                                .setImage(IMAGECUSTOM)
                                .setAuthor("Liste des joueurs", IMAGESERVER)
                                .addField("Joueurs",""+joueurs+"",true)
                                .addField("Elo",""+eloa+"",true)
                                .setColor(0x00FFFF)
                                .setFooter("Created By Black Snow| Ultimecode.com © 2017", IMAGESERVER)
                                message.channel.sendEmbed(embed);

                            console.log("Creating Custom");
                            var TotalElo = 0;
                            eloLen = elos.length;
                            for (i = 0; i < eloLen; i++) {
                                TotalElo += parseInt(elos[i]);
                                
                            }
            
                            console.log("TotalElo: "+TotalElo);
            
                            var moyenne = (TotalElo/parseInt(2));
                            var diference = parseInt(10);
                            var min = parseInt(moyenne - (diference/parseInt(2)));
                            var top = parseInt(moyenne);
                            var max = parseInt(moyenne + (diference/parseInt(2)));
                            var Team1=[];
                            var Team2=[];
                            var tryed = 0;
                            var num = 0;
                            var t1 = 0;
                            var random = [];
                            var dif_base = diference;
                            var result = 0;
                            var user = players;
                            do {
                                var elotone = 0;
                                var elottwo = 0;
                                var random = [];
                                var Team1 = [];
                                var Team2 = [];
                                var Elos_modif = elos;
                                var Elo_bas = elos;
                                for (i = 0; i <=5; i++) {
                                    var randomnum = getRandomInt(0, 9);
                                    index = contains.call(random, randomnum); 
                                    if(!index){
                                        random.push(randomnum);
                                    }
                                }
                                if(random.length==5){
                                    console.log("Team1: ");
                                    for (ib = 0; ib < random.length; ib++) {
                                        Team1.push(random[ib]);
                                        elotone += parseInt(Elos_modif[random[ib]]);
                                        console.log(players[random[ib]]  +" - "+ Elos_modif[random[ib]] );
                                     
                                    }
                                    console.log("Elo Team 1: "+parseInt(elotone));
            
                                   console.log("Team2: ");
                                    for (i = 0; i < Elos_modif.length; i++) {
                                        var id = i;
                                        if(!existence(i,random)){
                                            console.log(players[i]  +" - "+ Elos_modif[i] );
                                            elottwo += parseInt(Elos_modif[i]);
                                        }
                                    }
                                  console.log("Elo Team 2: "+parseInt(elottwo));
            
            
                                    if(Team1.length==5){
                                        if(parseInt(elotone) >= parseInt(min)){
                                            if(parseInt(elotone) <= parseInt(max)){
                                                result = 1;
                                               
                                            }else{
                                                result = 0;
                                            }
                                        }else{
                                            result = 0;
                                        }
                                    }else{
                                        result = 0;
                                    }             
                                }else{
                                    result = 0;
                                }
                                
                                tryed = tryed +1;
                                if(tryed>=10){
                                    diference += 10;
                                     min = parseInt(moyenne - (diference/parseInt(2)));
                                     top = parseInt(moyenne);
                                     max = parseInt(moyenne + (diference/parseInt(2)));
                                     tryed = 0;
                                }
            
                            }while (result != 1);
                           console.log("========== !TEAM FOUND! ==========");
                           console.log("Team 1:");
                           var spacer = "\n";
                           var team1txt = "";
                           var team2txt = "";
                           var elot1 = 0;
                           var elot2 = 0;
                           for (ib = 0; ib < Team1.length; ib++) {
                              var value = Team1[ib];
                              var ida = elos.indexOf(elos[value]);
                              console.log(players[ida]+" - "+elos[value]);
                              team1txt += players[ida]+spacer;
                              elot1 += parseInt(elos[value]);
                           }
                           team1txt += "=== Elo ==="+spacer;
                           team1txt += "        "+parseInt(elot1/5)+spacer;
            
                           console.log("======================");
                           console.log("Team 2:");
                           for (i = 0; i < Elos_modif.length; i++) {
                                var id = i;
                                if(!existence(i,random)){
                                    console.log(players[i]  +" - "+ Elos_modif[i] );
                                    team2txt += players[i]+spacer;
                                    elot2 += parseInt(Elos_modif[i]);
                                }
                            
                            }
                            team2txt += "=== Elo ==="+spacer;
                            team2txt += "        "+parseInt(elot2/5)+spacer;
            
                            var suma = parseInt(elot1/5)+parseInt(elot2/5);
                            var total = parseInt(suma/2);
                            console.log("total: "+ total );
                            var img;
                            if(total > 0 ){img = "http://www.ultimecode.com/paragon/images/bronze.png";}
                            if(total > 1100 ){img = "http://www.ultimecode.com/paragon/images/silver.png";}
                            if(total > 1300 ){img = "http://www.ultimecode.com/paragon/images/gold.png";}
                            if(total > 1500 ){img = "http://www.ultimecode.com/paragon/images/plate.png";}
                            if(total > 1700 ){img = "http://www.ultimecode.com/paragon/images/diamond.png";}
                            if(total > 2200 ){img = "http://www.ultimecode.com/paragon/images/master.png";}
                            
                           var embed = new Discord.RichEmbed()
                           .setTitle("")
                           .setAuthor("Custom paragon party creator", IMAGESERVER)
                           .addField("Team 1",""+team1txt+"",true)
                           .addField("Team 2",""+team2txt+"",true)
                           
                           .setColor(0x00FFFF)
                           .setImage(img)
                           .setFooter("Created By Black Snow | Ultimecode.com © 2017", IMAGESERVER)
                           message.channel.sendEmbed(embed);
                        }else{
                            message.channel.sendMessage("Merci de votre participation "+message.author+", il reste "+placelibre+" places de libre pour ce custom.");
                            players[placelibre]=message.author.username
                            elos[placelibre]=args[1];
                             ///// LIST ////
                                var joueurs = "";
                                var eloa = "";
                                playerLen = players.length;
                                separator = "\n";
                                for (i = 0; i < playerLen; i++) {
                                    if( !isEmpty(players[i]) || players[i]==""){
                                        joueurs += players[i]+separator;
                                    }else{
                                        joueurs += "-"+separator;
                                    }
                                    
                                    if( !isEmpty(elos[i]) || elos[i]==""){
                                        eloa += parseInt(elos[i])+separator;
                                    }else{
                                        eloa += "-"+separator;
                                    }
                                }

                                var embed = new Discord.RichEmbed()
                                .setTitle("")
                                .setImage(IMAGECUSTOM)
                                .setAuthor("Liste des joueurs", IMAGESERVER)
                                .addField("Joueurs",""+joueurs+"",true)
                                .addField("Elo",""+eloa+"",true)
                                .setColor(0x00FFFF)
                                .setFooter("Created By Black Snow | Ultimecode.com © 2017", IMAGESERVER)
                                message.channel.sendEmbed(embed);
                        }
                       
                    }
                }else{
                    message.channel.sendMessage(message.author+" pour lancer ou rejoindre la custom ecrit      .custom elo    ");  
                }
            }
            break;
        case "reload":
				console.log(players.length);
                for (ina = 0; ina < 10; ina++) {
                    console.log(players[ina]+" - "+parseInt(elos[ina]));
                }
                if(elos.length=10 && players.length==10){

                     var joueurs = "";
                     var eloa = "";

 console.log("==== Reload Custom =====");
                     playerLen = players.length;

                     elosLen = elos.length;

                     separator = "\n";
                     for (i = 0; i < playerLen; i++) {
                         if( !isEmpty(players[i]) || players[i]!=""){
                             joueurs += players[i]+separator;
                           //  players_reload.push(players[i]);
                             console.log(players[i]);
                         }else{
                             joueurs += "-"+separator;
                         }
                         
                        
                     }

//var elos = ['1354',1351,1450,1400,1480,1389,1500,1410,1399,1320];
                      for (i = 0; i < elosLen; i++) {
                        
                         if( !isEmpty(elos[i]) || elos[i]!=""){
                            // eloa += parseInt(elos[i])+separator;
                          //   elo_reload.push(parseInt(elos[i]));
                          console.log(parseInt(elos[i]));
                         }else{
                             eloa += "-"+separator;
                         }
                     }

console.log("=============================");
                   

/*
                     var embed = new Discord.RichEmbed()
                     .setTitle("")
                     .setImage(IMAGECUSTOM)
                     .setAuthor("Liste des joueurs", IMAGESERVER)
                     .addField("Joueurs",""+joueurs+"",true)
                     .addField("Elo",""+eloa+"",true)
                     .setColor(0x00FFFF)
                     .setFooter("Created By Black Snow | Ultimecode.com © 2017", IMAGESERVER)
                     message.channel.sendEmbed(embed);
*/
                     // CUSTOM //

                     
                            //// Begin custom ////

                            /*
                            .custom a 1310
                            .custom b 1320
                            .custom c 1330
                            .custom d 1340
                            .custom e 1350
                            .custom f 1360
                            .custom g 1370
                            .custom h 1380
                            .custom i 1390
                            .custom j 1400

                            */
                            console.log("Creating Custom");
                            var TotalElo = 0;
                            eloLen = elos.length;
                            for (i = 0; i < eloLen; i++) {
                                TotalElo += parseInt(elos[i]);
                                
                            }
            
                            console.log("TotalElo: "+TotalElo);
            
                            var moyenne = (TotalElo/parseInt(2));
                            var diference = parseInt(10);
            
                            var min = parseInt(moyenne - (diference/parseInt(2)));
                            var top = parseInt(moyenne);
                            var max = parseInt(moyenne + (diference/parseInt(2)));
                            var Team1=[];
                            var Team2=[];
                            var tryed = 0;
                            var num = 0;
                            var t1 = 0;
                            var random = [];
                            var dif_base = diference;
                            var result = 0;
                            var user = players;
                            do {
                             //   console.log("===="+tryed+"====");
                             //   console.log("min: "+min);
                            //    console.log("top: "+top);
                             //   console.log("max: "+max);
            
            
                                var elotone = 0;
                                var elottwo = 0;
                                var random = [];
                                var Team1 = [];
                                var Team2 = [];
                                var Elos_modif = elos;
                                var Elo_bas = elos;
                                for (i = 0; i <=5; i++) {
                                    var randomnum = getRandomInt(0, 9);
                                    index = contains.call(random, randomnum); 
                                    if(!index){
                                        random.push(randomnum);
                                    }
                                }
                                if(random.length==5){
                               //     console.log("Team1: ");
                                    for (ib = 0; ib < random.length; ib++) {
                                        Team1.push(random[ib]);
                                        elotone += parseInt(elos[random[ib]]);
                                      //  console.log(players[random[ib]]  +" - "+ elos[random[ib]] );
                                     
                                    }
                                //    console.log("Elo Team 1: "+parseInt(elotone));
            
                                //   console.log("Team2: ");
                                    for (i = 0; i < elos.length; i++) {
                                        var id = i;
                                        if(!existence(i,random)){
                                       //     console.log(players[i]  +" - "+ elos[i] );
                                            elottwo += parseInt(elos[i]);
                                        }
                                    }
                                 // console.log("Elo Team 2: "+parseInt(elottwo));
            
            
                                    if(Team1.length==5){
                                        if(parseInt(elotone) >= parseInt(min)){
                                            if(parseInt(elotone) <= parseInt(max)){
                                                result = 1;
                                               
                                            }else{
                                                result = 0;
                                            }
                                        }else{
                                            result = 0;
                                        }
                                    }else{
                                        result = 0;
                                    }             
                                }else{
                                    result = 0;
                                }
                                
                                tryed = tryed +1;
                                if(tryed>=10){
                                    diference += 10;
                                  //  console.log("Uping diference: "+parseInt(diference));
                                     min = parseInt(moyenne - (diference/parseInt(2)));
                                     top = parseInt(moyenne);
                                     max = parseInt(moyenne + (diference/parseInt(2)));
                                     tryed = 0;
                                }
            
            
                            }while (result != 1);
                         //  console.log("========== !TEAM FOUND! ==========");
                          // console.log("Team 1:");
                           var spacer = "\n";
                           var team1txt = "";
                           var team2txt = "";
                           var elot1 = 0;
                           var elot2 = 0;
                           for (ib = 0; ib < Team1.length; ib++) {
                               //team1txt += players[ib]+" - "+elos[Team1[ib]]+spacer;
                               var value = Team1[ib];
                               var ida = elos.indexOf(elos[value]);
                              console.log(players[ida]+" - "+elos[value]);
                             // team1txt += players[ida]+" - "+elos[value]+spacer;
                              team1txt += players[ida]+spacer;
                              elot1 += parseInt(elos[value]);
                           }
                           team1txt += "=== Elo ==="+spacer;
                           team1txt += "        "+parseInt(elot1/5)+spacer;
            
                           console.log("======================");
                           console.log("Team 2:");
                           for (i = 0; i < elos.length; i++) {
                                var id = i;
                                if(!existence(i,random)){
                                    console.log(players[i]  +" - "+ elos[i] );
                                    team2txt += players[i]+spacer;
                                    elot2 += parseInt(elos[i]);
                                   // team2txt += players[i]+" - "+Elos_modif[i]+spacer;
                                }
                            
                            }
                            team2txt += "=== Elo ==="+spacer;
                            team2txt += "        "+parseInt(elot2/5)+spacer;
            
                            var suma = parseInt(elot1/5)+parseInt(elot2/5);
                            var total = parseInt(suma/2);
                            console.log("total: "+ total );
                            var img;
                            if(totalelo <= 0 ){img = "http://www.ultimecode.com/paragon/images/bronze.png";}
                            if(totalelo >= 0 ){img = "http://www.ultimecode.com/paragon/images/bronze.png";}
                            if(totalelo >= 1100 ){img = "http://www.ultimecode.com/paragon/images/silver.png";}
                            if(totalelo >= 1300 ){img = "http://www.ultimecode.com/paragon/images/gold.png";}
                            if(totalelo >= 1500 ){img = "http://www.ultimecode.com/paragon/images/plate.png";}
                            if(totalelo >= 1700 ){img = "http://www.ultimecode.com/paragon/images/diamond.png";}
                            if(totalelo >= 2200 ){img = "http://www.ultimecode.com/paragon/images/master.png";}
                            
                           var embed = new Discord.RichEmbed()
                           .setTitle("")
                           .setAuthor("Custom paragon party creator", IMAGESERVER)
                           .addField("Team 1",""+team1txt+"",true)
                           .addField("Team 2",""+team2txt+"",true)
                           .setColor(0x00FFFF)
                           .setImage(img)
                           .setFooter("Created By Black Snow | Ultimecode.com © 2017", IMAGESERVER)
                           message.channel.sendEmbed(embed);
                       
                }

                    
             
                    
               
            break;

        default:
            message.channel.sendMessage("Ne me troll pas "+message.author+" sinon Black Snow va te casser les doigts :stuck_out_tongue_winking_eye: ");
            var embed = new Discord.RichEmbed()
           // .addField("Custom Creator",".help      Menu d'aide. \n.info       Comment lancer le custom. \n.list         Voir les joueurs inscrits au custom. \n.clear     Annuler le custom. \n\n.agora nom-in-game          Récuperer son elo.\n.custom elo                 Joindre un custom.",true)
           
           	.addField("Commandes",".help\n.info\n.list\n.clear\n.agora nom-in-game\n.custom elo\n.exit\n.modif nouveau-elo\n.average elo(x5)",true)
            .addField("Descriptions","Menu d'aide. \nComment lancer le custom. \nVoir les joueurs inscrits au custom. \nAnnuler le custom.\nRécuperer son elo.\nJoindre un custom.\nSortir du custom.\nModifier son elo. \nex: .average 1550 1520 1510 1530 1520",true)
            
            .setColor(0x00FFFF)
            .setFooter("Created By Black Snow | Ultimecode.com © 2017", IMAGESERVER)
            message.channel.sendEmbed(embed);
            break;
        
    }
    
  //  message.delete();
});

String.prototype.isNumber = function(){return /^\d+$/.test(this);}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

function countcustomuser(){
    return players.length();
}

function Cleared() {
    placelibre = 10;
    players = [];
    elos = [];
}

function getByValue(arr, value) {
    
    for (var i=0, iLen=arr.length; i<iLen; i++) {

    if (arr[i].b == value) return arr[i];
    }
}

function existence(id,random){
   var boolean = false;

    for (ia = 0; ia < random.length; ia++) {
        if(random[ia] == id){
            boolean = true;
        }
    }

    return boolean;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomInRange(min, max) {
  return Math.random() < 0.5 ? ((1-Math.random()) * (max-min) + min) : (Math.random() * (max-min) + min);
}

function list() {
    var listed = "";
    playerLen = players.length;
    separator = "\n";
    for (i = 0; i < playerLen; i++) {
        listed += players[i]+" - "+elos[i]+separator;
    }
    return listed;
}

var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};
bot.login(process.env.BOT_TOKEN);
