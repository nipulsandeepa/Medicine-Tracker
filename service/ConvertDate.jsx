import moment from "moment/moment"

export const FormatDate=(timestamp)=>{

    return new Date(timestamp)
}

export const formatDateForText=(date)=>
{
    return moment(date).format('ll') 
}


export const formatTime = (timestamp) => {
    const date = new Date(timestamp); // Fix capitalization
    return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });
};


export const getDatesRange=(startdate,enddate)=>
{
    const start= moment(startdate,'MM/DD/YYYY');
    const end= moment(enddate,'MM/DD/YYYY');
    const dates=[];

    while(start.isSameOrBefore(end))
    {
        dates.push(start.format('MM/DD/YYYY'));
        start.add(1,'days')
    }
    return dates;
}

export const getDatesRangeToDisplay=()=>
{
    const dateList=[];
    for(let i=0;i<=7;i++)
    {
        dateList.push(
            {
                date:moment().add(i,'days').format('DD'),
                day:moment().add(i,'days').format('dd'),
                formatedDate:moment().add(i,'days').format('L')
            }
        )
    }

    return dateList;
}