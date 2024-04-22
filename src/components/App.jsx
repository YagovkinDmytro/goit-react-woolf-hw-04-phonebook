import { useState } from 'react';
import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import PhonebookForm from './PhonebookForm/PhonebookForm';
import Section from './Section/Section';
import './Section/section.css';
import ContactsList from './ContactsList/ContactsList';
import FilterContacts from './FilterContacts/FilterContacts';
import './PhonebookForm/phonebookForm.css';
import './FilterContacts/filterContacts.css';
import './ContactsList/contactsList.css';

export const App = () => {
  const [contacts, setContacts] = useState(getLocalStorage());

  const [filter, setFilter] = useState('');

  const handleChange = ({ target: { value, name } }) => {
    if (name === 'filter') {
      setFilter(value);
    }
  };

  const createNewContact = (name, number) => {
    const isExist = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const loginInputId = nanoid();
    setContacts(prev => [...prev, { id: loginInputId, name, number }]);
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().startsWith(filter.toLowerCase())
    );
  };

  const handleDelete = id => {
    setContacts(prev => prev.filter(elem => elem.id !== id));
  };

  function getLocalStorage() {
    const localData = JSON.parse(localStorage.getItem('contacts'));
    return localData && localData.length > 0 ? localData : [];
  }

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="container">
      <Section title="Phonebook">
        <PhonebookForm handleSubmit={createNewContact} />
      </Section>
      <Section title="Contacts">
        <FilterContacts stateFilter={filter} handleChange={handleChange} />
        <ContactsList
          contactsArr={filterContacts()}
          handleDelete={handleDelete}
        />
      </Section>
    </div>
  );
};
