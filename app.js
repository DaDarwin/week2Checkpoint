let player ={
    rocksOnClick: 1,
    autoRocks:0,
}
let rocks = 100
let totalRocks = 0

function collectRocks(){
    rocks += player.rocksOnClick
}

let upgrades = [
    [
        {name:'Pick',
        qty:0,
        amount:1,
        price:5},
        {name:'Drill',
        qty:0,
        amount:5,
        price: 20},
    ],
   []
]


function addUpgrade(kind,upgradeName){
    console.log(kind,upgradeName)
    let addedUpgrade = upgrades[kind].find(upgrade => upgrade.name == upgradeName)
    console.log(addedUpgrade)
    if(rocks >= addedUpgrade.price){
        console.log(`Rocks: ${rocks} Upgrade: ${addedUpgrade}`)
        rocks -= addedUpgrade.price
        addedUpgrade.qty ++
        addedUpgrade.price = Math.round((addedUpgrade.price * 1.01) + (1 * addedUpgrade.qty))
        console.log(`Rocks: ${rocks} Upgrade: ${addedUpgrade}`)
        updateStats(kind ,addedUpgrade)
        updateDom(addedUpgrade)
    }
}

function updateStats(kind, upgrade){
    if(kind == 0){
        player.rocksOnClick += upgrade.amount
    }
    else player.autoRocks += upgrade.amount
}

function updateDom(upgrade){
    document.getElementById('rockAmount').innerText = `Rocks: ${rocks}`
    document.getElementById('clickRocks').innerText = `Rocks on Click${player.rocksOnClick}`
    document.getElementById('autoRocks').innerText = `Passive Rocks: ${player.autoRocks}`

    if(upgrade){
    let upgradeElmChildren = document.getElementById(upgrade.name).children
    upgradeElmChildren[0].innerText =`Name:${upgrade.name}`
    upgradeElmChildren[1].innerText = `Qty: ${upgrade.qty}` 
    upgradeElmChildren[2].innerText = `Click Power:${upgrade.qty * upgrade.amount}`
    upgradeElmChildren[3].innerText = `Rock Cost:${upgrade.price} Rocks`
}}