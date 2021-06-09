import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を取得して、入っている文字を消す
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

// 未完了リストから指定の要素を削除する関数。完了ボタンと削除ボタンの両方で必要だから関数化した。
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

// 未完了リストに追加する関数。
const createIncompleteList = (text) => {
  // div.list-row生成
  const div = document.createElement("div");
  div.className = "list-row";

  // li生成
  const li = document.createElement("li");
  li.innerText = text;

  // 完了ボタンタグ生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  // 完了ボタンを押すと完了したToDoへ移動する
  completeButton.addEventListener("click", () => {
    // 押された完了ボタンの親要素divを未完了リストからdeleteFromIncompleteList関数を使って削除
    deleteFromIncompleteList(completeButton.parentNode);

    // 完了リストに追加する要素
    const addTarget = completeButton.parentNode;
    // ToDo内容のテキストを取得
    const text = addTarget.firstElementChild.innerText;

    // div以下を初期化
    addTarget.textContent = null;

    // 完了したToDoに入れるliタグ生成
    const li = document.createElement("li");
    li.innerText = text;

    // 完了したToDoに入れる戻るボタン生成
    const backButton = document.createElement("button");
    backButton.innerHTML = "未完に戻す";
    backButton.addEventListener("click", () => {
      // 押された戻すボタンの親要素divを完了リストから削除
      const deleteTarget = backButton.parentNode;
      document.getElementById("complete-list").removeChild(deleteTarget);
      // テキスト取得
      const text = backButton.parentNode.firstElementChild.innerText;

      // 未完のToDoへ内容を戻す
      createIncompleteList(text);
    });

    // divタグの子要素にさっき作ったliとbuttonを入れる
    addTarget.appendChild(li);
    addTarget.appendChild(backButton);
    // 完了リストに追加
    document.getElementById("complete-list").appendChild(addTarget);
  });

  // 削除ボタンタグ生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  // 削除ボタンを押すとToDoリストから削除される
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンの親要素divを未完了リストからdeleteFromIncompleteList関数
    deleteFromIncompleteList(deleteButton.parentNode);
  });

  // divタグの子要素に各要素を入れる
  div.appendChild(li);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // 未完了リストに追加
  document.getElementById("incomplete-list").appendChild(div);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
