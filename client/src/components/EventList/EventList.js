import React from 'react';
import Eventcard from '../Eventcard';
import API from '../../utils/API';


const EventList = ({ results, ...props }) =>
    <div id="eventList" className="event-List">
        <h5 className="header text-center">Attending Events</h5>
        <div className="card-body">
            {results[0] ?
                results.slice(0, 20).map(activity => {
                    return (
                        <Eventcard
                            key={activity._id}
                            id={activity.id}
                            title={activity.title}
                            body={activity.body}
                            contact={activity.contact}
                            location={activity.address}
                            time={activity.time}
                            points={activity.points}
                            recollectData={props.recollectData} />
                    )
                }) :
                <h5>No Results</h5>
            }
        </div>
    </div>;

export default EventList;