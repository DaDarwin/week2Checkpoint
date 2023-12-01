let player ={
    rocksOnClick: 1,
    autoRocks:0,
}
let rocks = 0
let totalRocks = 0

function collectRocks(){
    rocks += player.rocksOnClick
    updateDom()
    buyButtons()
}
function autoRocks(){
    rocks += player.autoRocks
    updateDom()
    buyButtons()
}

let upgrades = [{
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
            {name:'Dude',
            kind:'auto',
            qty:0,
            amount:1,
            price: 50},
            {name:'Heavy Machinery',
            kind:'auto',
            qty:0,
            amount:10,
            price: 100},
            ]


function findUpgrade(upgradeName){
        let upgrade = upgrades.find(upgrade => upgrade.name == upgradeName)
        return upgrade

}
function addUpgrade(upgradeName){
    
    let addedUpgrade = findUpgrade(upgradeName)

    if(rocks >= addedUpgrade.price){
        console.log(`Rocks: ${rocks} Upgrade: ${addedUpgrade}`)
        rocks -= addedUpgrade.price
        addedUpgrade.qty ++
        addedUpgrade.price = Math.round((addedUpgrade.price * 1.1) + (1 * addedUpgrade.qty))
        // console.log(`Rocks: ${rocks} Upgrade: ${addedUpgrade}`)
        updateStats(addedUpgrade)
        updateDom(addedUpgrade)
    }
}

function updateStats(upgrade){
    if(upgrade.kind == 'click'){
        player.rocksOnClick += upgrade.amount}

    if(upgrade.kind == 'auto'){
        player.autoRocks += upgrade.amount}
}

function updateDom(upgrade){
    document.getElementById('rockAmount').innerText = `Rocks: ${rocks}`
    document.getElementById('clickRocks').innerText = `RPC: ${player.rocksOnClick}`
    document.getElementById('autoRocks').innerText = `RPS: ${player.autoRocks}`

    if(upgrade){
    let upgradeElmChildren = document.getElementById(upgrade.name).children
    upgradeElmChildren[0].innerText =`${upgrade.name}:`
    upgradeElmChildren[1].innerText = `Power: ${upgrade.qty * upgrade.amount}`
    upgradeElmChildren[2].innerText = `Qty: ${upgrade.qty}` 
    upgradeElmChildren[3].innerText = `Rock Cost: ${upgrade.price} Rocks`
}}

function drawUpgrade(upgradeName){
    let upgrade = findUpgrade(upgradeName)

    document.getElementById(upgrade.name).remove()

    const upgradeELM = document.createElement('div')
    upgradeELM.id = upgrade.name
    upgradeELM.classList.add('row.justify-content-center.m-2')
    console.log(upgradeELM)

    const nameELM = document.createElement('h4')
    nameELM.classList.add('col-12')
    console.log(nameELM)
    
    const powerELM = document.createElement('h5')
    powerELM.classList.add('col-6')
    console.log(powerELM)
    
    const qtyELM = document.createElement('h5.m-0')
    qtyELM.classList.add('col-6.m-0')
    console.log(qtyELM)
    
    const priceELM = document.createElement('button')
    priceELM.classList.add('col-6.btn.btn-outline-info')
    priceELM.setAttribute('onclick',`addUpgrade('${upgrade.name}')`)
    console.log(priceELM)

    upgradeELM.append(nameELM, powerELM, qtyELM, priceELM)
    console.log(upgradeELM)
    document.getElementById(upgrade.kind).append(upgradeELM)
}

function buyButtons(){
    upgrades.filter(upgrade=> upgrade.qty == 0).forEach(upgrade =>{
        console.log(upgrade)
        if(rocks >= upgrade.price && document.getElementById(upgrade.name) == null){
            console.log(upgrade.name)
            const buyElm = document.createElement('button')
            buyElm.id = upgrade.name
            buyElm.setAttribute('onclick',`drawUpgrade('${upgrade.name}'), addUpgrade('${upgrade.name}')`)
            buyElm.innerText =`Buy ${upgrade.name}`
            buyElm.classList.add('col-12')
            console.log(buyElm)
            document.getElementById(upgrade.kind).append(buyElm)
        }
    })
}
setInterval(autoRocks, 1000)