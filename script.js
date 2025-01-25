body {
    font-family: Arial, sans-serif;
    background-color: white;
    color: black;
    text-align: center;
}

.container {
    width: 80%;
    margin: 0 auto;
}

h1 {
    font-size: 24px;
    margin-bottom: 20px;
}

input[type="file"], input[type="text"] {
    margin: 10px 0;
    padding: 10px;
    width: 100%;
    max-width: 300px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    background-color: green;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 4px;
    width: 100%;
    max-width: 300px;
}

button:hover {
    background-color: darkgreen;
}

#resultsContainer {
    margin-top: 20px;
}

.result {
    margin-top: 20px;
    padding: 10px;
    background-color: #f0f0f0;
    margin-bottom: 10px;
    border-radius: 4px;
}

.result a {
    color: green;
    text-decoration: none;
}

.result a:hover {
    text-decoration: underline;
}

#fileResultsContainer {
    margin-top: 20px;
}

@media (max-width: 600px) {
    .container {
        width: 95%;
    }

    button {
        width: 100%;
    }

    input[type="text"], input[type="file"] {
        width: 100%;
    }
}
