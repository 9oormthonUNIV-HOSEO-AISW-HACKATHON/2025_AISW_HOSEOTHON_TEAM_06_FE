import React from 'react';
import styled from 'styled-components'

const Temp = styled.div`
    width: 50px;
    height: 50px;
    background-color: coral;
`

const SignIn = () => {
    return (
        <div>
            Sign In
            <Temp></Temp>
        </div>
    );
};

export default SignIn;