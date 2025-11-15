export const timeAgo=(createdAt)=>{
    const difference=Math.abs(new Date()-new Date(createdAt));          //js always give in milisec


    const seconds=difference/1000;
    const minutes=seconds/60;
    const hours=minutes/60;
    const days=hours/24;
    const weeks=days/7;
    const months=weeks/4.345;
    const years=months/12;




    if(seconds<60)
      return `${Math.round(seconds)} seconds ago`;
    else if(minutes<60)
      return `${Math.round(minutes)} minutes ago`;
    else if(hours<24)
      return `${Math.round(hours)} hours ago`;
    else if(days<7)
      return `${Math.round(days)} days ago`;
    else if(weeks<4)
      return `${Math.round(weeks)} weeks ago`;
    else if(months<12)
      return `${Math.round(months)} months ago`;
    else
      return `${Math.round(years)} years ago`;
    
}





export const formatDuration=(seconds)=>{
    const minutes=Math.floor(seconds/60);
    const remainingSeconds=Math.floor(seconds%60);

    return minutes+':'+(remainingSeconds?'0':'')+remainingSeconds;
}