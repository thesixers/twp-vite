import React from 'react'
import { Plus, BookOpenText } from 'lucide-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../../requests/apicalls'
import { useUserContext } from '../../context/UserProvider'

export default function AddScripture() {
    const [toogleScripture, setToogleScripture] = React.useState(false)
    const [book, setBook] = React.useState('')
    const [word, setWord] = React.useState('')
    const { setScripture } = useUserContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let res = await axios.post(`${serverUrl}/twp/admin/scripture`, {
                book,
                word
            }, { withCredentials: true })

            if(res.data.M){
                setScripture({book, word})
                alert(res.data.M)
                toogleScripture(false)
            }

        } catch (err) {
            alert(err.message)
        }
        finally{
            setBook('')
            setWord('')
        }
    }

  return (
    <div>
        {
            toogleScripture && (
            <div class="add--scrip-container">
                <form id="add-scrip" onSubmit={handleSubmit} class="add-scrip">
                    <h3>Add New Scripture</h3>
                    <div class="close" onClick={() => {setToogleScripture(false)}}>&times;</div>
                    <div class="something">&timesb;</div>
                    <div class="message"></div>
                    <div class="add-scrip-input-wrapper">
                        <label class="add-scrip-label">Book: </label>
                        <input type="text" name="book" onChange={(e) => {setBook(e.target.value)}} value={book} id="book" class="add-scrip-input"/>
                    </div>
                    <br/>
                    <div class="word-wrapper">
                        <label class="">Word: </label>
                        <textarea name="word" onChange={(e) => {setWord(e.target.value)}} value={word} id="word"></textarea>
                    </div>
                    <br/>
                    <div class="btn-wrapper">
                        <button>Submit</button>
                    </div>
                </form>
            </div>
            )
        }

        <div class="show-script-form" title="Add New Scripture">
            <span class="script-add" onClick={() => {setToogleScripture(true)}}>
                <BookOpenText />
            </span>
        </div>

        <div class="add-webtoon-form" title="Add a new webtoon">
            <Link to="/become%20an%20author">
                <Plus />
            </Link>
        </div>
    </div>
  )
}
