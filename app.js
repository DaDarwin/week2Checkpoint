let player ={
    rocksOnClick: 1,
    autoRocks:0,
}
let rocks = 100
let totalRocks = 0

function collectRocks(){
    rocks += player.rocksOnClick
    updateDom()
}

let upgrades = {
        click:[{
            name:'Pick',
            kind:'click',
            qty:0,
            amount:1,
            price:5},
            {name:'Drill',
            kind:'click',
            qty:0,
            amount:5,
            price: 20},
            ],
        auto:[]
}

function addUpgrade(kind, upgradeName){
    console.log(kind, upgradeName) 
    let type;
    if(kind == 'click') type = upgrades.click
    type.find(upgrade => upgrade.name == upgradeName)
    console.log(type)
    let addedUpgrade = type.find(upgrade => upgrade.name == upgradeName)
    console.log(addedUpgrade)
    find(upgrade => upgrade.name == upgradeName)
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
    if(kind == 'click'){
        player.rocksOnClick += upgrade.amount
    }
    else player.autoRocks += upgrade.amount
}

function updateDom(upgrade){
    document.getElementById('rockAmount').innerText = `Rocks: ${rocks}`
    document.getElementById('clickRocks').innerText = `RPC: ${player.rocksOnClick}`
    document.getElementById('autoRocks').innerText = `RPS: ${player.autoRocks}`

    if(upgrade){
    let upgradeElmChildren = document.getElementById(upgrade.name).children
    upgradeElmChildren[0].innerText =`${upgrade.name}:`
    upgradeElmChildren[1].innerText = `Click Power:${upgrade.qty * upgrade.amount}`
    upgradeElmChildren[2].innerText = `Qty: ${upgrade.qty}` 
    upgradeElmChildren[3].innerText = `Rock Cost: ${upgrade.price} Rocks`
}}

function drawUpgrade(upgrade){
    const upgradeELM = document.createElement('div')
    upgradeELM.id = upgrade.name
    upgradeELM.classList.add('row justify-content-center')

    const nameELM = document.createElement('h4')
    nameELM.classList.add('col-12')
    const powerELM = document.createElement('h5')
    powerELM.classList.add('col-6')
    const qtyELM = document.createElement('h5')
    qtyELM.classList.add('col-6')
    const priceELM = document.createElement('button')
    priceELM.classList.add('col-6 btn btn-outline-info')
    priceELM.onclick = addUpgrade(upgrade.name)


}

console.log(upgrades.find(type => type.upgrade == type.find(upgrade => upgrade.name == 'Pick')))