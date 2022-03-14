AFRAME.registerComponent("atoms", {
    init: async function(){
        var compound=await this.getcompound()
        var barcodes=Object.keys(compound)
        barcodes.map((barcode)=>{
            var element=compound[barcode]
            this.createatom(element)
        })
    },

  getcompound: function(){
    return fetch("js/compoundlist.json").then(respond=>
        respond.json()
    ).then(data=>data)
  },
  getelementcolor: function(){
    return fetch("js/elementColors.json").then(respond=>
        respond.json()
    ).then(data=>data)
  
  },
  
  createatom: async function(element){
      var elementname = element.element_name;
      var barcodevalue = element.barcode_value;
      var numberofelectron = element.number_of_electron; 

      var color = await this.getelementcolor()

      var scene=document.querySelector("a-scene")
      var marker=document.createElement("a-marker")

      marker.setAttribute("id",`marker-${barcodevalue}`)
      marker.setAttribute("type","barcode")
      marker.setAttribute("element_name",elementname)
      marker.setAttribute("value",barcodevalue)

      scene.appendChild(marker)
      //atom

      var atom=document.createElement("a-entity")
      atom.setAttribute("id",`${elementname}-${barcodevalue}`)
      
      marker.appendChild(atom)

      //atomcard

      var card=document.createElement("a-entity")
      card.setAttribute("id",`card-${elementname}`)
      card.setAttribute("geometry",{
        primitive:"plane",width:1,height:1

      })
      card.setAttribute("material",{
        src:`./assets/atom_cards/card_${elementname}.png`
        
      })
      card.setAttribute("position",{x:0 ,y:0, z:0})

      
      card.setAttribute("rotation",{x:-90 ,y:0, z:0})
      
      atom.appendChild(card)
      
    
      //nucleus

      var nucleusradius = 0.3
      var nucleus=document.createElement("a-entity")
      nucleus.setAttribute("id",`nucleus-${elementname}`)
      nucleus.setAttribute("geometry",{
        primitive:"sphere",radius:nucleusradius

      })
      nucleus.setAttribute("material",color[elementname])
      nucleus.setAttribute("position",{x:0 ,y:1, z:0})

      
      nucleus.setAttribute("rotation",{x:0 ,y:0, z:0})
      
    

      
      var nucleusname=document.createElement("a-entity")
      nucleusname.setAttribute("id",`nucleusname-${elementname}`)
      
      nucleus.setAttribute("text",{

        width:4,
        color:"blue",
        font:"monoid",
        value:elementname
      })
      nucleusname.setAttribute("position",{x:0 ,y:0.2, z:0})      
      nucleusname.setAttribute("rotation",{x:-90 ,y:0, z:0})
      
      nucleus.appendChild(nucleusname)
      atom.appendChild(nucleus)
    
    }

  
});
