import { getDataFromDocs ,getDataFromDoc} from "../utils.js"
const style =`
`
class SearchHint extends HTMLElement {
    constructor() {
        super()
        this._shadowDom = this.attachShadow({mode: "open"})
    }
    async connectedCallback() {
        this._shadowDom.innerHTML = `
            <style>
                ${style}
            </style>
                <div class='searchBar'>
                  <input type="text" id="myInput" placeholder="Search for names.." list="ProductsList" title="Type in a name">
                  <input type="submit">
                  <datalist id="ProductsList">
    
                  </datalist>
                </div>
            `
          const res = await firebase.firestore().collection('cafes').get()
          const data = getDataFromDocs(res)
          const listArr = []
    
          for (const iterator of data) {
            listArr.push(iterator.name)
            
          }
          let html =''
          let ProductsList = this._shadowDom.querySelector('#ProductsList')
          
          listArr.forEach(element =>{
            html+=`
              <option value="${element}" />
            `
          })
          ProductsList.innerHTML=`
            ${html}
          `
        //   check and give result
        let textSearch = this._shadowDom.querySelector('#myInput')
        
        textSearch.addEventListener('keyup', ()=>{
        let nameSearch = textSearch.value
        let firstRun = ''
        const result =firebase.firestore()
        .collection('cafes')
        .where('name', "==",nameSearch)
        .onSnapShot((snapShot)=>{
            if(firstRun){
                return
            }
            const docChange = snapShot.docChanges()
            for(const oneChange of docChange) {
                console.log(oneChange)
                // if( oneChange.name === `${}`){
                //     this.appendPostItem(getDataFromDoc(oneChange.doc))
                //     // console.log(getDataFromDocs(oneChange.doc))
                // }
            }
    
        })
        // return result.id
        })
        //   const result = await firebase.firestore().collection('cafes').where('name', '==' ,  textSearch).get()


           
            
          }
}
window.customElements.define("search-hint", SearchHint)