function reset() {
	game = {
    money: OmegaNum(0),
    multiplier: OmegaNum(1),
    rebirths: OmegaNum(0),
    upgradesBought: [],
    moneyPermaMult: OmegaNum(1),
    prestiges: OmegaNum(0),
    rebirthPermaMult: OmegaNum(1),
    fire: OmegaNum(0),
    multiPermaMult: OmegaNum(1),
    prestigePermaMult: OmegaNum(1),
    water: OmegaNum(0),
  }
}

reset()

function hardReset() {
  if (confirm("Are you sure you want to reset? You will lose everything!")) {
    reset()
    save()
    location.reload()
  }
}

function save() {
	localStorage.setItem("AbsoluteBSSave", JSON.stringify(game))
}

setInterval(save, 5000)

function exportGame() {
  save()
  navigator.clipboard.writeText(btoa(JSON.stringify(game))).then(function() {
    alert("Copied to clipboard!")
  }, function() {
    alert("Error copying to clipboard, try again...")
  });
}

function importGame() {
  loadgame = JSON.parse(atob(prompt("Input your save here:")))
  if (loadgame && loadgame != null && loadgame != "") {
    reset()
    loadGame(loadgame)
    save()
  }
  else {
    alert("Invalid input.")
  }
}

function load() {
	reset()
	let loadgame = JSON.parse(localStorage.getItem("AbsoluteBSSave"))
	if (loadgame != null) {
		loadGame(loadgame)
	}
}

load()

function loadGame(loadgame) {
  //Sets each variable in 'game' to the equivalent variable in 'loadgame' (the saved file)
  for (i=0; i<Object.keys(loadgame).length; i++) {
    if (loadgame[Object.keys(loadgame)[i]] != "undefined") {
      if (typeof loadgame[Object.keys(loadgame)[i]] == "string") {game[Object.keys(loadgame)[i]] = new OmegaNum(loadgame[Object.keys(loadgame)[i]])}
      else {game[Object.keys(game)[i]] = loadgame[Object.keys(loadgame)[i]]}
    }
  }

  if (game.upgradesBought[0] == true) {
    document.getElementsByClassName("upgradeButton")[0].style.display = "none"
    for (i=0; i<3; i++) document.getElementsByClassName("rebirthButton")[i].style.display = "inline-block"
    document.getElementsByClassName("resourceText")[0].style.display = "inline-block"
  }
  if (game.upgradesBought[1] == true) {
    document.getElementsByClassName("upgradeButton")[1].style.display = "none"
    for (i=10; i<17; i++) document.getElementsByClassName("moneyButton")[i].style.display = "inline-block"
    for (i=3; i<8; i++) document.getElementsByClassName("rebirthButton")[i].style.display = "inline-block"
  }
  if (game.upgradesBought[2] == true) {
    document.getElementsByClassName("upgradeButton")[2].style.display = "none"
  }
  if (game.upgradesBought[3] == true) {
    document.getElementsByClassName("upgradeButton")[3].style.display = "none"
    for (i=0; i<3; i++) document.getElementsByClassName("prestigeButton")[i].style.display = "inline-block"
    document.getElementsByClassName("resourceText")[1].style.display = "inline-block"
  }
  if (game.upgradesBought[4] == true) {
    document.getElementsByClassName("upgradeButton")[4].style.display = "none"
    for (i=17; i<21; i++) document.getElementsByClassName("moneyButton")[i].style.display = "inline-block"
    for (i=8; i<12; i++) document.getElementsByClassName("rebirthButton")[i].style.display = "inline-block"
    for (i=3; i<9; i++) document.getElementsByClassName("prestigeButton")[i].style.display = "inline-block"
  }
  if (game.upgradesBought[5] == true) {
    document.getElementsByClassName("upgradeButton")[5].style.display = "none"
  }
  if (game.upgradesBought[6] == true) {
    document.getElementsByClassName("upgradeButton")[6].style.display = "none"
    document.getElementsByClassName("upgradeButton")[7].style.display = "inline-block"
    document.getElementsByClassName("upgradeButton")[8].style.display = "inline-block"
    document.getElementsByClassName("upgradeButton")[9].style.display = "inline-block"
    document.getElementsByClassName("upgradeButton")[10].style.display = "inline-block"
    document.getElementsByClassName("upgradeButton")[11].style.display = "inline-block"
    for (i=0; i<3; i++) document.getElementsByClassName("fireButton")[i].style.display = "inline-block"
    document.getElementsByClassName("resourceText")[2].style.display = "inline-block"
  }
  if (game.upgradesBought[7] == true) {
    document.getElementsByClassName("upgradeButton")[7].style.display = "none"
  }
  if (game.upgradesBought[8] == true) {
    document.getElementsByClassName("upgradeButton")[8].style.display = "none"
    for (i=21; i<moneyCosts.length; i++) document.getElementsByClassName("moneyButton")[i].style.display = "inline-block"
    for (i=12; i<rebirthCosts.length; i++) document.getElementsByClassName("rebirthButton")[i].style.display = "inline-block"
    for (i=9; i<prestigeCosts.length; i++) document.getElementsByClassName("prestigeButton")[i].style.display = "inline-block"
    for (i=3; i<fireCosts.length; i++) document.getElementsByClassName("fireButton")[i].style.display = "inline-block"
  }
  if (game.upgradesBought[9] == true) {
    document.getElementsByClassName("upgradeButton")[9].style.display = "none"
  }
  if (game.upgradesBought[10] == true) {
    document.getElementsByClassName("upgradeButton")[10].style.display = "none"
  }
  if (game.upgradesBought[11] == true) {
    for (i=0; i<waterCosts.length; i++) document.getElementsByClassName("waterButton")[i].style.display = "inline-block"
    document.getElementsByClassName("resourceText")[3].style.display = "inline-block"
  }

  update()
}

function update() {
  $("#money").html(format(game.money, 0))
  $("#multiplier").html(format(game.multiplier, 0))
  $("#rebirths").html(format(game.rebirths, 0))
  $("#prestiges").html(format(game.prestiges, 0))
  $("#fire").html(format(game.fire, 0))
  $("#water").html(format(game.water, 0))
  for (i=0; i<moneyCosts.length; i++) {
    document.getElementsByClassName("moneyBoost")[i].innerHTML = format(OmegaNum(moneyBoosts[i]).mul(game.rebirths.add(1).mul(game.multiPermaMult)), 0)
    if (game.money.gte(moneyCosts[i])) document.getElementsByClassName("moneyButton")[i].style.filter = "brightness(140%)"
    else {document.getElementsByClassName("moneyButton")[i].style.filter = null}
  }
  if (game.upgradesBought[0] == true) {
    for (i=0; i<rebirthCosts.length; i++) {
      document.getElementsByClassName("rebirthBoost")[i].innerHTML = format(OmegaNum(rebirthBoosts[i]).mul(game.prestiges.add(1).mul(game.rebirthPermaMult)), 0)
      if (game.multiplier.gte(rebirthCosts[i])) document.getElementsByClassName("rebirthButton")[i].style.filter = "brightness(140%)"
      else {document.getElementsByClassName("rebirthButton")[i].style.filter = null}
    }
  }
  if (game.upgradesBought[3] == true) {
    for (i=0; i<prestigeCosts.length; i++) {
      document.getElementsByClassName("prestigeBoost")[i].innerHTML = format(OmegaNum(prestigeBoosts[i]).mul(game.fire.add(1).mul(game.prestigePermaMult)), 0)
      if (game.rebirths.gte(prestigeCosts[i])) document.getElementsByClassName("prestigeButton")[i].style.filter = "brightness(140%)"
      else {document.getElementsByClassName("prestigeButton")[i].style.filter = null}
    }
  }
  if (game.upgradesBought[6] == true) {
    for (i=0; i<fireCosts.length; i++) {
      document.getElementsByClassName("fireBoost")[i].innerHTML = format(OmegaNum(fireBoosts[i]).mul(game.water.add(1)), 0)
      if (game.prestiges.gte(fireCosts[i])) document.getElementsByClassName("fireButton")[i].style.filter = "brightness(140%)"
      else {document.getElementsByClassName("fireButton")[i].style.filter = null}
    }
  }
  if (game.upgradesBought[11] == true) {
    for (i=0; i<waterCosts.length; i++) {
      if (game.fire.gte(waterCosts[i])) document.getElementsByClassName("waterButton")[i].style.filter = "brightness(140%)"
      else {document.getElementsByClassName("waterButton")[i].style.filter = null}
    }
  }
}

timeSinceUpdate = Date.now()
function resourcesUp() {
  timeDiff = (Date.now() - timeSinceUpdate) / 1000
  
  game.money = game.money.add(game.multiplier.mul(timeDiff).mul(game.moneyPermaMult))

  update()
  timeSinceUpdate = Date.now()
}

setInterval(resourcesUp, 100)

function buyMoney(x) {
  if (game.money.gte(moneyCosts[x])) {
    game.money = game.money.sub(moneyCosts[x])
    game.multiplier = game.multiplier.add(OmegaNum(moneyBoosts[x]).mul(game.rebirths.add(1)).mul(game.multiPermaMult))
    update()
  }
}

function buyRebirths(x) {
  if (game.multiplier.gte(rebirthCosts[x])) {
    game.money = OmegaNum(0)
    game.multiplier = OmegaNum(1)
    game.rebirths = game.rebirths.add(OmegaNum(rebirthBoosts[x]).mul(game.prestiges.add(1)).mul(game.rebirthPermaMult))
    update()
  }
}

function buyPrestiges(x) {
  if (game.rebirths.gte(prestigeCosts[x])) {
    game.money = OmegaNum(0)
    game.multiplier = OmegaNum(1)
    game.rebirths = OmegaNum(0)
    game.prestiges = game.prestiges.add(OmegaNum(prestigeBoosts[x]).mul(game.fire.add(1)).mul(game.prestigePermaMult))
    update()
  }
}

function buyFire(x) {
  if (game.prestiges.gte(fireCosts[x])) {
    game.money = OmegaNum(0)
    game.multiplier = OmegaNum(1)
    game.rebirths = OmegaNum(0)
    game.prestiges = OmegaNum(0)
    game.fire = game.fire.add(OmegaNum(fireBoosts[x]).mul(game.water.add(1)))
    update()
  }
}

function buyWater(x) {
  if (game.fire.gte(waterCosts[x])) {
    game.money = OmegaNum(0)
    game.multiplier = OmegaNum(1)
    game.rebirths = OmegaNum(0)
    game.prestiges = OmegaNum(0)
    game.fire = OmegaNum(0)
    game.water = game.water.add(waterBoosts[x])
    update()
  }
}

function buyUpgrade(x) {
  if (x==7 && game.fire.gte(1) && game.upgradesBought[7] != true) {
    document.getElementsByClassName("upgradeButton")[7].style.display = "none"
    game.upgradesBought[7] = true
    game.fire = game.fire.sub(1)
    game.moneyPermaMult = game.moneyPermaMult.mul(50)
    game.multiPermaMult = game.multiPermaMult.mul(5)
  }
  else if (game.money.gte(upgradeCosts[x]) && game.upgradesBought[x] != true) {
    game.money = game.money.sub(upgradeCosts[x])
    document.getElementsByClassName("upgradeButton")[x].style.display = "none"
    game.upgradesBought[x] = true
    if (x==0) {
      for (i=0; i<3; i++) document.getElementsByClassName("rebirthButton")[i].style.display = "inline-block"
      document.getElementsByClassName("resourceText")[0].style.display = "inline-block"
    }
    else if (x==1) {
      for (i=10; i<17; i++) document.getElementsByClassName("moneyButton")[i].style.display = "inline-block"
      for (i=3; i<8; i++) document.getElementsByClassName("rebirthButton")[i].style.display = "inline-block"
    }
    else if (x==2) {
      game.moneyPermaMult = game.moneyPermaMult.mul(50)
    }
    else if (x==3) {
      for (i=0; i<3; i++) document.getElementsByClassName("prestigeButton")[i].style.display = "inline-block"
      document.getElementsByClassName("resourceText")[1].style.display = "inline-block"
    }
    else if (x==4) {
      for (i=17; i<21; i++) document.getElementsByClassName("moneyButton")[i].style.display = "inline-block"
      for (i=8; i<12; i++) document.getElementsByClassName("rebirthButton")[i].style.display = "inline-block"
      for (i=3; i<9; i++) document.getElementsByClassName("prestigeButton")[i].style.display = "inline-block"
    }
    else if (x==5) {
      game.rebirthPermaMult = game.rebirthPermaMult.mul(100)
    }
    else if (x==6) {
      document.getElementsByClassName("upgradeButton")[7].style.display = "inline-block"
      document.getElementsByClassName("upgradeButton")[8].style.display = "inline-block"
      document.getElementsByClassName("upgradeButton")[9].style.display = "inline-block"
      document.getElementsByClassName("upgradeButton")[10].style.display = "inline-block"
      document.getElementsByClassName("upgradeButton")[11].style.display = "inline-block"
      for (i=0; i<3; i++) document.getElementsByClassName("fireButton")[i].style.display = "inline-block"
      document.getElementsByClassName("resourceText")[2].style.display = "inline-block"
    }
    else if (x==8) {
      for (i=21; i<moneyCosts.length; i++) document.getElementsByClassName("moneyButton")[i].style.display = "inline-block"
      for (i=12; i<rebirthCosts.length; i++) document.getElementsByClassName("rebirthButton")[i].style.display = "inline-block"
      for (i=9; i<prestigeCosts.length; i++) document.getElementsByClassName("prestigeButton")[i].style.display = "inline-block"
      for (i=3; i<fireCosts.length; i++) document.getElementsByClassName("fireButton")[i].style.display = "inline-block"
    }
    else if (x==9) {
      game.rebirthPermaMult = game.rebirthPermaMult.mul(500)
    }
    else if (x==10) {
      game.prestigePermaMult = game.prestigePermaMult.mul(100)
    }
    else if (x==11) {
      for (i=0; i<waterCosts.length; i++) document.getElementsByClassName("waterButton")[i].style.display = "inline-block"
      document.getElementsByClassName("resourceText")[3].style.display = "inline-block"
    }
    update()
  }
}

function changeTab(x) {
  $("#moneyDiv").css("display", "none")
  $("#upgradeDiv").css("display", "none")
  $("#optionsDiv").css("display", "none")
  if (x==0) $("#moneyDiv").css("display", "block")
  else if (x==1) $("#upgradeDiv").css("display", "block")
  else if (x==2) $("#optionsDiv").css("display", "block")
}