import React from "react";
import { Plus, BookOpenText, X } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../context/UserProvider";

export default function AddScripture() {
  const [toogleScripture, setToogleScripture] = React.useState(false);
  const [book, setBook] = React.useState("");
  const [word, setWord] = React.useState("");
  const { setScripture } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        "https://twp2.onrender.com/twp/admin/scripture",
        { book, word },
        { withCredentials: true }
      );

      if (res.data.M) {
        setScripture({ book, word });
        alert(res.data.M);
        setToogleScripture(false);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setBook("");
      setWord("");
    }
  };

  return (
    <div>
      {/* Modal */}
      {toogleScripture && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative p-6 animate-fadeIn">
            {/* Close */}
            <button
              onClick={() => setToogleScripture(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-orange-600 transition"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Add New Scripture
            </h3>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="book"
                  className="block text-sm font-medium text-gray-600"
                >
                  Book
                </label>
                <input
                  type="text"
                  id="book"
                  name="book"
                  value={book}
                  onChange={(e) => setBook(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter book name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="word"
                  className="block text-sm font-medium text-gray-600"
                >
                  Word
                </label>
                <textarea
                  id="word"
                  name="word"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Write the scripture..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-2 rounded-md font-medium hover:bg-orange-700 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4">
        {/* Add Scripture */}
        <button
          title="Add New Scripture"
          onClick={() => setToogleScripture(true)}
          className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center text-white shadow-md hover:bg-orange-700 transition"
        >
          <BookOpenText size={22} />
        </button>

        {/* Add Webtoon */}
        <Link
          to="/publish"
          title="Add a New Webtoon"
          className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white shadow-md hover:bg-green-700 transition"
        >
          <Plus size={22} />
        </Link>
      </div>
    </div>
  );
}
