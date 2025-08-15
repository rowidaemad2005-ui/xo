document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('resetButton');
    const statusMessage = document.querySelector('.status-message');

    let currentPlayer = 'X';
    let gameActive = true;
    let board = ['', '', '', '', '', '', '', '', '']; 

    
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    
    const updateStatus = (message) => {
        statusMessage.textContent = message;
    };

    // معالجة نقرة على الخلية
    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.dataset.cellIndex);

        // إذا كانت الخلية مشغولة أو اللعبة غير نشطة، لا تفعل شيئاً
        if (board[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        // تحديث اللوحة والواجهة
        board[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase()); // إضافة كلاس للون

        checkResult();
    };

    // التحقق من نتيجة اللعبة (فوز أو تعادل)
    const checkResult = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = board[winCondition[0]];
            let b = board[winCondition[1]];
            let c = board[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            updateStatus(`اللاعب ${currentPlayer} فاز!`);
            gameActive = false;
            return;
        }

        // التحقق من التعادل
        let roundDraw = !board.includes('');
        if (roundDraw) {
            updateStatus('تعادل!');
            gameActive = false;
            return;
        }

        // تبديل اللاعب
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus(`دور اللاعب: ${currentPlayer}`);
    };

    // إعادة تعيين اللعبة
    const resetGame = () => {
        currentPlayer = 'X';
        gameActive = true;
        board = ['', '', '', '', '', '', '', '', ''];
        updateStatus(`دور اللاعب: ${currentPlayer}`);
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
    };

    // إضافة مستمعي الأحداث
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);

    // تهيئة رسالة الحالة الأولية
    updateStatus(`دور اللاعب: ${currentPlayer}`);
});
