class Aisle {
  constructor(id, elemcollection=null) {
    this.name = id;
    this.attachment = elemcollection;
  }

  produce() {
    var aisle = document.createElement("DIV");
    aisle.setAttribute("CLASS", "menu aisle");
    aisle.setAttribute("ID", this.name);
    if (this.attachment != null) {
      aisle.appendChild(elemcollection);
    }
    return aisle;
  }
}

var mensaisle = new Aisle("menaisle");
