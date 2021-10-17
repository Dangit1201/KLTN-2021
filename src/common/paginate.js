module.exports = (page, totalPage, delta=2)=>{

    const pages = [];
    const pagesWithDot = [];
    const left = page - delta;
    const right = page + delta;
    for(let i=1; i<=totalPage; i++){
        if(i===1 || i===totalPage || i===page || (left <= i && i <= right )){
            pages.push(i);
        }
        else if(i==left -1 || i==right + 1){
            pages.push("...");
        }
        
    }
    return pages;
}