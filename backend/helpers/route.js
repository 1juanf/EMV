const Math = require('mathjs');
const {getAllamb,getemer,updateemer,getamb} = require('../database');


function rad(x) {
  //console.log(x*Math.PI/180);
  return x*Math.pi/180;
};

async function getRouteById (lat1,lon1,lat2,lon2) {
    const R = 6378.137; //Radio de la tierra en km
    const dLat = rad( lat2 - lat1 );
    const dLong = rad( lon2 - lon1 );
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    //console.log(dLat,dLong,a,c,d);
    return d.toFixed(3); //Retorna tres decimales
};

async function getListAmb(id){
  const emer = await getemer(id);
  const amb = await getAllamb();
  const lon = parseFloat(emer.longemer);
  const lat = parseFloat(emer.latemer);
  var ditAmb=[];
  for (var i = 0; i < amb.length; i++) {
      ditAmb.push({dist : getRouteById(lat,lon,parseFloat(amb[i].amblat),parseFloat(amb[i].amblon)), id_amb : amb[i].idamb});
  }
  //console.log(ditAmb.sort((a, b) => (a.dist > b.dist) ? 1 : -1));
  return ditAmb.sort((a, b) => (a.dist > b.dist) ? 1 : -1);
};

async function opEmer(a,id){
  const ListAmb = await getListAmb(id);
  console.log('function',ListAmb.length);
  for (var i = 0; i < ListAmb.length; i++) {
    console.log('for');
    if(a == 1){
      var amb = await getamb(ListAmb[i].id_amb);
      console.log(amb[0]);
      updateemer(amb[0].idamb,id);
      console.log('ok');
      break;
    }
  }
};

module.exports = {
  getRouteById,
  getListAmb,
  opEmer
};
