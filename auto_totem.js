const reverse = !GlobalVars.getBoolean("autoTotemModuleState");
const inv = Player.openInventory()
const totem = "minecraft:totem_of_undying"
function getItemSlots(searchedItem) {
    const map = inv.getMap();
    var foundSlots = []
    const slots = Array.from(map.get("main")).concat(Array.from(map.get("hotbar")));
    var slotsSet = new Set(slots);
    slotsSet.delete(map.get("hotbar")[0])
    for (const slot of slots) {
        if (inv.getSlot(slot).getItemId() == searchedItem) {
            foundSlots.push(slot)
        }
	}
    return foundSlots
}
function hasItemSelected(item) {
    let currentOffHandItem = Player.getPlayer().getOffHand()
    switch (item) {
        case currentOffHandItem.getItemId():
            text="true"
            break;
        default:
            text="false"
            break;
    }
    return text
}
GlobalVars.putBoolean("autoTotemModuleState", reverse);
if (reverse) {
    Chat.log(Chat.createTextBuilder().append("[").withColor(0x7).append("Utils").withColor(0x6).append("]").withColor(0x7).append(" AutoTotem").withColor(0xd).append(" enabled").withColor(0xa).build());
} else {
    Chat.log(Chat.createTextBuilder().append("[").withColor(0x7).append("Utils").withColor(0x6).append("]").withColor(0x7).append(" AutoTotem").withColor(0xd).append(" disabled").withColor(0xc).build());
}
while (GlobalVars.getBoolean("autoTotemModuleState")) {
    if (hasItemSelected(totem) == "false") {
        let totemSlots = getItemSlots(totem)
        if (!!totemSlots.length) {
            inv.swapHotbar(totemSlots[0],40)
        }
    }
    Client.waitTick()
}
