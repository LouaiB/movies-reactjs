import React, { useState, useEffect } from 'react';
import './TrendingTimespanPicker.sass';

export default function TrendingTimespanPicker({setSpan}) {

    const [activeBtn, setActiveBtn] = useState(3);

    const spans = {
        yearly:         { id: 0, span: 365 },
        semiAnnually:   { id: 1, span: 182 },
        quarterly:      { id: 2, span: 91 },
        monthly:        { id: 3, span: 30 },
        weekly:         { id: 4, span: 7 },
        daily:          { id: 5, span: 1 },
    }

    useEffect(() => {
        switch(activeBtn){
            case spans.yearly.id:
                setSpan(spans.yearly.span);
                break;
            case spans.semiAnnually.id:
                setSpan(spans.semiAnnually.span);
                break;
            case spans.quarterly.id:
                setSpan(spans.quarterly.span);
                break;
            case spans.monthly.id:
                setSpan(spans.monthly.span);
                break;
            case spans.weekly.id:
                setSpan(spans.weekly.span);
                break;
            case spans.daily.id:
                setSpan(spans.daily.span);
                break;
        }
    }, [activeBtn]);

    return (
        <div className="btn-group">
            <button className={`btn ${activeBtn == spans.yearly.id ? 'active' : ''}`} onClick={() => setActiveBtn(spans.yearly.id)}>YEARLY</button>
            <button className={`btn ${activeBtn == spans.semiAnnually.id ? 'active' : ''}`} onClick={() => setActiveBtn(spans.semiAnnually.id)}>SEMI-ANNUALLY</button>
            <button className={`btn ${activeBtn == spans.quarterly.id ? 'active' : ''}`} onClick={() => setActiveBtn(spans.quarterly.id)}>QUARTERLY</button>
            <button className={`btn ${activeBtn == spans.monthly.id ? 'active' : ''}`} onClick={() => setActiveBtn(spans.monthly.id)}>MONTHLY</button>
            <button className={`btn ${activeBtn == spans.weekly.id ? 'active' : ''}`} onClick={() => setActiveBtn(spans.weekly.id)}>WEEKLY</button>
            <button className={`btn ${activeBtn == spans.daily.id ? 'active' : ''}`} onClick={() => setActiveBtn(spans.daily.id)}>DAILY</button>
        </div>
    )
}
