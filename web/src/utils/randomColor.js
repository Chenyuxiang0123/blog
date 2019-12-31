function randomColor(){
  const r = parseInt( Math.random() * 255 )
  const g = parseInt( Math.random() * 255 )
  const b = parseInt( Math.random() * 255 )
  const a = parseFloat( Math.random() )

  const color = `background-color:rgba(${r},${g},${b},${a})`
  return color
}

export default randomColor