// ************************************
// execute widget
let widget = await createWidget()
if (config.runsInWidget) {
  Script.setWidget(widget)
} else {
  widget.presentMedium()
}
Script.complete()
// ************************************
async function createWidget() {
  // declare widget
  let w = new ListWidget()
  // call async request to fetch wallet amount
  let { balance } = await fetchBitcoinWalletAmount()
  //background color
  w.backgroundColor = new Color("#000000")
  // **************************************
  //header icon
  let docsSymbol = SFSymbol.named("bitcoinsign.square")
  let bitcoinIconImage = w.addImage(docsSymbol.image)
  bitcoinIconImage.rightAlignImage()
  bitcoinIconImage.imageSize = new Size(25, 25)
  bitcoinIconImage.tintColor = Color.green()
  bitcoinIconImage.imageOpacity = 0.8
  bitcoinIconImage.url = "https://www.google.com"
  // **************************************
  // MAIN CONTAINER
  let mainContainerStack = w.addStack()
  // TOP CONTAINER
  let leftContainerStack = mainContainerStack.addStack()
  leftContainerStack.layoutVertically()
  let rightContainerStack = mainContainerStack.addStack()
  rightContainerStack.layoutVertically()
  // TOP LEFT STACK:
  // **************************************
  // Large Bal
  let largeFont = Font.largeTitle(20)
  const largeBalanceStack = leftContainerStack.addStack()
  const largeBalance = largeBalanceStack.addText('$' + (balance).toString())
  largeBalance.font = largeFont
  largeBalance.textColor = new Color('#ffffff')

  // **************************************
  //refresh widget automatically
  let nextRefresh = Date.now() + 1000
  w.refreshAfterDate = new Date(nextRefresh)
  showGradientBackground(w)
  return w
}
function showGradientBackground(widget) {
  let gradient = new LinearGradient()
  gradient.colors = [new Color("#0a0a0a"), new Color("#141414"), new Color("#1f1f1f")]
  gradient.locations = [0,0.8,1]
  widget.backgroundGradient = gradient
}

async function getBalance(){
  let BTCUrl = 'http://localhost:5000/balance'
  let request = new Request(BTCUrl)
  request.method = "get";
  let response = await request.loadJSON()
  return response.body
}
// fetch bitcoin wallet amount
async function fetchBitcoinWalletAmount(){
  let btcBalanceAmount = await getBalance()
  return { balance: btcBalanceAmount }
}