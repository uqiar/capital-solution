import React from "react";
import { Route, Routes } from "react-router-dom";
import Protectd from './protectedRoutes';
import {RoutingList} from './list';

const Routing = () => {
 
    return (
        <Routes>
            {
                RoutingList.map((rout, key) => (
                    <Route key={"rout" + key}
                        path={rout.route}
                        element={
                            rout.is_protected ?
                                <Protectd>
                                    {rout.element}
                                </Protectd>
                                : rout.element
                        } />
                ))
            }

        </Routes>

    );
}

export default Routing;
