import Form from './components/Form';

function App() {
     const handlesubmit = (values) => {
          console.log(values);
     };
     const initialValue = {
          name: '',
          email: '',
          contact: '',
          gender: '',
          notes: '',
     };

     return (
          <div className='App'>
               <Form initialValue={initialValue} handlesubmit={handlesubmit} />
          </div>
     );
}

export default App;
