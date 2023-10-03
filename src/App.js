import './App.css';
import React, { useState } from "react";

function App() {

  const REST_Service_URL = "https://microservices-crud-operation.onrender.com"

  const [view, setView] = useState('login');

  const [subview, setSubview] = useState('table');

  const [user, setUser] = useState({
    id: null,
    username: '',
    email: '',
    city: ''
  })

  const login = async () => {
    await fetch(REST_Service_URL + '/users', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      }
    }).then((response) => response.json())
      .then((users) => {
        console.log(users);
        let userExist = false;
        if (users && users.length > 0) {
          users.forEach(_user => {
            if (_user.username === user.username && _user.email === user.email) {
              userExist = true;
              setUser(_user);
            }
          });
        }
        if (userExist) {
          setView('dashboard');
          setSubview('table');
        }
        else {
          alert('user not found');
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const logout = () => {
    setView('login');
  }

  const updateUser = async () => {
    await fetch(REST_Service_URL + '/users/' + user.id, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
    }).then((response) => response.json())
      .then((_user) => {
        setUser(_user);
        setSubview('table');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const deletUser = async () => {
    await fetch(REST_Service_URL + '/users/' + user.id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
    }).then(() => { alert('user deleted successfully!'); setView('login') })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const register = async () => {
    await fetch(REST_Service_URL + '/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
    }).then((response) => response.json())
      .then((_user) => {
        alert('registration successful!')
        setUser(_user);
        setView('login');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className='row'>
          <h5 className="col-6 h5 display-5">My Application</h5>
          {view === 'dashboard' &&
            <div className='ms-auto col-4'>
              <button className='btn btn-warning m-2' onClick={logout}>Log Out</button>
              <button className='btn btn-danger m-2' onClick={deletUser}>Delete User</button>
            </div>
          }
        </div>
      </header>
      <div className="App-body">
        {
          view === 'login' &&
          <div className='container container-fluid row'>
            <form onSubmit={(e) => { e.preventDefault(); login(); }} className='form col-12'>
              <div className='row'>
                <div className='ms-auto col-4'>
                  <input type='text' name='username' value={user.username} onChange={(v) => { setUser((user) => { return { ...user, username: v.target.value } }) }}
                    placeholder='Username' className='form-control' />
                </div>
                <div className='col-4'>
                  <input type='email' name='email' value={user.email} onChange={(v) => { setUser((user) => { return { ...user, email: v.target.value } }) }}
                    placeholder='Email' className='form-control' />
                </div>
                <div className='col-2'>
                  <button type='submit' className='btn btn-primary form-control'> Log in </button>
                </div>
              </div>
              <div className='row justify-content-center'>
              </div>
              <div className='container container-fluid row text-center'>
                <button className='btn btn-link' onClick={() => setView('register')} > New User? Register Now</button>
              </div>
            </form>
          </div>
        }

        {
          view === 'register' &&
          <form onSubmit={(e) => { e.preventDefault(); register(); }} className='form col-12'>
            <div className='row'>
              <div className='ms-auto col-3'>
                <input type='text' name='username' value={user.username} onChange={(v) => { setUser((user) => { return { ...user, username: v.target.value } }) }}
                  placeholder='Username' className='form-control' />
              </div>
              <div className='col-3'>
                <input type='email' name='email' value={user.email} onChange={(v) => { setUser((user) => { return { ...user, email: v.target.value } }) }}
                  placeholder='Email' className='form-control' />
              </div>
              <div className='col-3'>
                <input type='text' name='city' value={user.city} onChange={(v) => { setUser((user) => { return { ...user, city: v.target.value } }) }}
                  placeholder='City' className='form-control' />
              </div>
              <div className='col-2'>
                <button type='submit' className='btn btn-primary form-control'> Register </button>
              </div>
            </div>
            <div className='row justify-content-center'>
            </div>
            <div className='container container-fluid row text-center'>
              <button className='btn btn-link' onClick={() => setView('login')}> Already Registered? Login Here</button>
            </div>
          </form>
        }
        {
          view === 'dashboard' &&
          <div className='container container-fluid row justify-content-center'>
            <div className="card col-6 text-center" key={user.id}>
              <h2 className="card-header">User Details</h2>
              {subview === 'table' && <>
                <p className="card-title m-4"> Username :  {user.username}</p>
                <p className="card-subtitle m-4"> Email :  {user.email}</p>
                <p className="card-subtitle m-4"> City :  {user.city}</p>
              </>
              }
              {subview === 'form' &&
                <form className='form col-12'>
                  <div className='row'>
                    <div className='col-10 m-4'>
                      <input type='text' name='username' value={user.username} onChange={(v) => { setUser((user) => { return { ...user, username: v.target.value } }) }}
                        placeholder='Username' className='form-control' />
                    </div>
                    <div className='col-10 m-4'>
                      <input type='email' name='email' value={user.email} onChange={(v) => { setUser((user) => { return { ...user, email: v.target.value } }) }}
                        placeholder='Email' className='form-control' />
                    </div>
                    <div className='col-10 m-4'>
                      <input type='text' name='city' value={user.city} onChange={(v) => { setUser((user) => { return { ...user, city: v.target.value } }) }}
                        placeholder='City' className='form-control' />
                    </div>
                  </div>
                </form>
              }
              <div className="">
                <div className="btn btn-warning m-4" onClick={() => { subview === 'table' ? setSubview('form') : setSubview('table') }} >{subview === 'table' ? 'Edit' : 'Cancel'}</div>
                {subview === 'form' && <div className="btn btn-success m-4" onClick={() => { updateUser() }} >Update</div>}
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
