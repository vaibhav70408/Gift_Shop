import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NavBarComp from './NavBar';
import { BrowserRouter } from "react-router-dom";
 
describe('NavBarComp', () => {
  beforeEach(() => {
    render(
<BrowserRouter>
<NavBarComp/>
</BrowserRouter>
    );
  });
 
  it('should display home link', () => {
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
 
  it('should display orders link', () => {
    expect(screen.getByText('Orders')).toBeInTheDocument();
  });
 
  it('should display gifts link', () => {
    expect(screen.getByText('Gifts')).toBeInTheDocument();
  });
 
  it('should display theme link', () => {
    expect(screen.getByText('Theme')).toBeInTheDocument();
  });
 
  it('should display my orders link', () => {
    expect(screen.getByText('My Orders')).toBeInTheDocument();
  });
 
  it('should display logout button', () => {
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});
