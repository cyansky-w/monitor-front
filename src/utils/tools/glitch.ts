class Glitch{
    constructor(){
        
    }
    init(element:Element){
        let div=document.createElement('div');
        div.classList.add('glitch');
        let eleRoot=element.cloneNode(true);
        let elClone=element.cloneNode(true);
        eleRoot.classList.add('glitch-root');
        elClone.classList.add('glitch-clone');
        let parent=element.parentNode;
        div.appendChild(eleRoot);
        div.appendChild(elClone);
        parent?.appendChild(div);
        element.remove();
    }
    cancle(element:Element){
        let parent=element.parentNode;
        let glitch=parent?.querySelector('.glitch');
        glitch?.remove();
        parent?.append(element);
    }
}
export default new Glitch();
