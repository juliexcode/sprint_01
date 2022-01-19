"use strict";

// verification si une clé existe dans le localStorage
display.innerHTML = (localStorage.getItem('list') != null) ?
  localStorage.getItem('list') : "";

teams.innerHTML = (localStorage.getItem('generate') != null) ?
  localStorage.getItem('generate') : "";



let words = [];
//fonction qui permet d'écrire un participant dans le texte et de l'ajouter dans le tableau" words"

function addUserInfo() {
  let userAdd = document.getElementById('userInput').value;

  //vérifie si le texte est vide donc ne fais rien
  if (userAdd != '') {
    words.push(userAdd);
    showUserInfo();

  }
}

function showUserInfo() {
  let showInfo = '';

  // inscrit pour chaque nom entrer dans le tableau "words" un <li>
  words.forEach(word =>
    showInfo += `
        <li class="list-group-item m-1">
            <p class="display-4">${word}<span class="float-right"><button  onClick="del(this)" class="btn btn-danger">X</button></span></p>
        </li>
        `
  );
  document.getElementById("display").innerHTML = showInfo;
  document.getElementById('userInput').value = null;

  console.log("tableau:", words);

  //Sauvegarde du HTML dans le storage
  localStorage.setItem("list", display.innerHTML);

  return false;
  //empeche l'actualisation de la page

}

// fonction du bonton supprimer 
function del(btnValue) {
  words.splice(parseInt(btnValue.value), 1);
  showUserInfo();


}



// fonction pour générer les groupes aléatoires
function genere() {


  document.getElementById("teams").innerHTML = "";



  const numTeams = Math.min(Number(document.getElementById("num-teams").value), words.length);
  console.log("gener:", words)

  //boucle pour créer le nombre groupes 
  for (var i = 0; i < numTeams; i++) {
    if (window.CP.shouldStopExecution(0)) break;

    //créer un élément p pour les noms
    const team = document.createElement("p");

    //afficher les groupes de 1 à..
    team.innerHTML = `Groupe ${i + 1}: `;
    teams.appendChild(team);

  }

  window.CP.exitedLoop(0);

  //random des apprenants dans les groupes
  let curTeam = 0;
  var rndIndex;
  while (words.length > 0) {
    if (window.CP.shouldStopExecution(1)) break;
    rndIndex = Math.floor(Math.random() * words.length);
    const player = words.splice(rndIndex, 1);



    //afficher les groupes avec les noms
    const newTeam = document.getElementById("teams").getElementsByTagName("p")[curTeam];
    let playerText = document.createTextNode(` ${player}  `);
    if (words.length < numTeams) {
      playerText = document.createTextNode(` ${player} `);
    }


    newTeam.appendChild(playerText);
    const bri = document.createElement('br');
    newTeam.appendChild(bri);
    if (curTeam < numTeams - 1) {
      curTeam++;
    } else {
      curTeam = 0;
    }
  } window.CP.exitedLoop(1);

  //sauvegarde du html dans le storage
  localStorage.setItem("generate", teams.innerHTML);



}


window.HUB_EVENTS = { ASSET_ADDED: "ASSET_ADDED", ASSET_DELETED: "ASSET_DELETED", ASSET_DESELECTED: "ASSET_DESELECTED", ASSET_SELECTED: "ASSET_SELECTED", ASSET_UPDATED: "ASSET_UPDATED", CONSOLE_CHANGE: "CONSOLE_CHANGE", CONSOLE_CLOSED: "CONSOLE_CLOSED", CONSOLE_EVENT: "CONSOLE_EVENT", CONSOLE_OPENED: "CONSOLE_OPENED", CONSOLE_RUN_COMMAND: "CONSOLE_RUN_COMMAND", CONSOLE_SERVER_CHANGE: "CONSOLE_SERVER_CHANGE", EMBED_ACTIVE_PEN_CHANGE: "EMBED_ACTIVE_PEN_CHANGE", EMBED_ACTIVE_THEME_CHANGE: "EMBED_ACTIVE_THEME_CHANGE", EMBED_ATTRIBUTE_CHANGE: "EMBED_ATTRIBUTE_CHANGE", EMBED_RESHOWN: "EMBED_RESHOWN", FORMAT_FINISH: "FORMAT_FINISH", FORMAT_ERROR: "FORMAT_ERROR", FORMAT_START: "FORMAT_START", IFRAME_PREVIEW_RELOAD_CSS: "IFRAME_PREVIEW_RELOAD_CSS", IFRAME_PREVIEW_URL_CHANGE: "IFRAME_PREVIEW_URL_CHANGE", KEY_PRESS: "KEY_PRESS", LINTER_FINISH: "LINTER_FINISH", LINTER_START: "LINTER_START", PEN_CHANGE_SERVER: "PEN_CHANGE_SERVER", PEN_CHANGE: "PEN_CHANGE", PEN_EDITOR_CLOSE: "PEN_EDITOR_CLOSE", PEN_EDITOR_CODE_FOLD: "PEN_EDITOR_CODE_FOLD", PEN_EDITOR_ERRORS: "PEN_EDITOR_ERRORS", PEN_EDITOR_EXPAND: "PEN_EDITOR_EXPAND", PEN_EDITOR_FOLD_ALL: "PEN_EDITOR_FOLD_ALL", PEN_EDITOR_LOADED: "PEN_EDITOR_LOADED", PEN_EDITOR_REFRESH_REQUEST: "PEN_EDITOR_REFRESH_REQUEST", PEN_EDITOR_RESET_SIZES: "PEN_EDITOR_RESET_SIZES", PEN_EDITOR_SIZES_CHANGE: "PEN_EDITOR_SIZES_CHANGE", PEN_EDITOR_UI_CHANGE_SERVER: "PEN_EDITOR_UI_CHANGE_SERVER", PEN_EDITOR_UI_CHANGE: "PEN_EDITOR_UI_CHANGE", PEN_EDITOR_UI_DISABLE: "PEN_EDITOR_UI_DISABLE", PEN_EDITOR_UI_ENABLE: "PEN_EDITOR_UI_ENABLE", PEN_EDITOR_UNFOLD_ALL: "PEN_EDITOR_UNFOLD_ALL", PEN_ERROR_INFINITE_LOOP: "PEN_ERROR_INFINITE_LOOP", PEN_ERROR_RUNTIME: "PEN_ERROR_RUNTIME", PEN_ERRORS: "PEN_ERRORS", PEN_LIVE_CHANGE: "PEN_LIVE_CHANGE", PEN_LOGS: "PEN_LOGS", PEN_MANIFEST_CHANGE: "PEN_MANIFEST_CHANGE", PEN_MANIFEST_FULL: "PEN_MANIFEST_FULL", PEN_PREVIEW_FINISH: "PEN_PREVIEW_FINISH", PEN_PREVIEW_START: "PEN_PREVIEW_START", PEN_SAVED: "PEN_SAVED", POPUP_CLOSE: "POPUP_CLOSE", POPUP_OPEN: "POPUP_OPEN", POST_CHANGE: "POST_CHANGE", POST_SAVED: "POST_SAVED", PROCESSING_FINISH: "PROCESSING_FINISH", PROCESSING_START: "PROCESSED_STARTED" }, "object" != typeof window.CP && (window.CP = {}), window.CP.PenTimer = { programNoLongerBeingMonitored: !1, timeOfFirstCallToShouldStopLoop: 0, _loopExits: {}, _loopTimers: {}, START_MONITORING_AFTER: 2e3, STOP_ALL_MONITORING_TIMEOUT: 5e3, MAX_TIME_IN_LOOP_WO_EXIT: 2200, exitedLoop: function (E) { this._loopExits[E] = !0 }, shouldStopLoop: function (E) { if (this.programKilledSoStopMonitoring) return !0; if (this.programNoLongerBeingMonitored) return !1; if (this._loopExits[E]) return !1; var _ = this._getTime(); if (0 === this.timeOfFirstCallToShouldStopLoop) return this.timeOfFirstCallToShouldStopLoop = _, !1; var o = _ - this.timeOfFirstCallToShouldStopLoop; if (o < this.START_MONITORING_AFTER) return !1; if (o > this.STOP_ALL_MONITORING_TIMEOUT) return this.programNoLongerBeingMonitored = !0, !1; try { this._checkOnInfiniteLoop(E, _) } catch (N) { return this._sendErrorMessageToEditor(), this.programKilledSoStopMonitoring = !0, !0 } return !1 }, _sendErrorMessageToEditor: function () { try { if (this._shouldPostMessage()) { var E = { topic: HUB_EVENTS.PEN_ERROR_INFINITE_LOOP, data: { line: this._findAroundLineNumber() } }; parent.postMessage(E, "*") } else this._throwAnErrorToStopPen() } catch (_) { this._throwAnErrorToStopPen() } }, _shouldPostMessage: function () { return document.location.href.match(/boomerang/) }, _throwAnErrorToStopPen: function () { throw "We found an infinite loop in your Pen. We've stopped the Pen from running. Please correct it" }, _findAroundLineNumber: function () { var E = new Error, _ = 0; if (E.stack) { var o = E.stack.match(/boomerang\S+:(\d+):\d+/); o && (_ = o[1]) } return _ }, _checkOnInfiniteLoop: function (E, _) { if (!this._loopTimers[E]) return this._loopTimers[E] = _, !1; var o; if (_ - this._loopTimers[E] > this.MAX_TIME_IN_LOOP_WO_EXIT) throw "Infinite Loop found on loop: " + E }, _getTime: function () { return +new Date } }, window.CP.shouldStopExecution = function (E) { var _ = window.CP.PenTimer.shouldStopLoop(E); return !0 === _ && console.warn("[CodePen]: An infinite loop (or a loop taking too long) was detected, so we stopped its execution. Sorry!"), _ }, window.CP.exitedLoop = function (E) { window.CP.PenTimer.exitedLoop(E) };

