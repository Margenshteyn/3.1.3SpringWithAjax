$(document).ready(getAllUsers());

// Для отображения списка пользователей в таблице
function getAllUsers() {
    $("#table").empty();// Удалить содержимое всех элементов блока с id = "table"
    $.ajax({
        type: 'GET',
        url: '/api/admin/allUsers',
        // timeout: 3000, // сработает через 3с
        success: function (data) {
            console.log(data);
            $.each(data, function (i, user) { // из полученных данных проходим по всем элементам
                $('#table').append($('<tr>').append(
                    $('<td>').append($('<span>')).text(user.id), //Установить текстовое содержимое для всех элементов <span>
                    $('<td>').append($('<span>')).text(user.username), // firstname
                    $('<td>').append($('<span>')).text(user.lastname),
                    $('<td>').append($('<span>')).text(user.age),
                    $('<td>').append($('<span>')).text(user.email),
                    $('<td>').append($('<span>')).text(user.roles),
                    $('<td>').append($('<button>').text("Edit").attr({ //Метод attr () устанавливает или возвращает атрибуты и значения выбранных элементов.
                        "type": "button",  // .attr(attribute,value)
                        "class": "btn btn-info edit",
                        "data-toggle": "modal",
                        "data-target": "#myModalEdit",
                    }).data("user", user)), //data(name,value) возращает данные из выбранного элемента(здесь button)
                    $('<td>').append($('<button>').text("Delete").attr({
                        "type": "button",
                        "class": "btn btn-danger delete",
                        "data-toggle": "modal",
                        "data-target": "#myModalDelete",
                    }).data("user", user))
                ))
            });
        }
    });
}

//Для редактирования пользователя через модальное окно
$(document).on("click", ".edit", function () {
    let user = $(this).data('user');

    $('#firstNameInput').val(user.username);
    $('#lastNameInput').val(user.lastname);
    $('#emailInput').val(user.email);
    $('#idInput').val(user.id);
    $('#ageInput').val(user.age);
    $('#roleInput').val(user.roles);
});

$(document).on("click", ".editUser", function () {
    let formData = $(".formEditUser").serializeArray(); // собирает данные вместе
    $.ajax({
        type: 'PUT',
        url: '/api/admin/update',
        data: formData,
        // timeout: 100,
        success: function () {
            getAllUsers();
        }
    });
});

//Для удаления пользователя через модальное окно
$(document).on("click", ".delete", function () {
    let user = $(this).data('user');

    $('#firstName').val(user.username);
    $('#lastName').val(user.lastname);
    $('#email').val(user.email);
    $('#id').val(user.id);
    $('#age').val(user.age);

    $(document).on("click", ".deleteUser", function () {
        $.ajax({
           type: 'DELETE',
           url: '/api/admin/remove',
           data: {id: $('#id').val()},
           // timeout: 100,
            success: function () {
                getAllUsers();
            }
        });
    });

});

// Для добавления пользователя
$('.addUser').click(function () {
    $('#usersTable').trigger('click');
    let formData = $('.formAddUser').serializeArray();
    $.ajax({
        type: 'POST',
        url: '/api/admin/addUser',
        data: formData,
        // timeout: 100,
        success: function () {
            $('.formAddUser')[0].reset(); // очищает форму
            getAllUsers();
        }
    });
});
//Для отображения информации о пользователе на его странице и сокрытия меню в зависимости от роли
// $(document).ready(function () {
$(function () {
    $("#userTable").empty(); // Удалить содержимое всех элементов блока с id = "table"
    $.ajax({
    type: 'GET',
    url: '/api/user/getUser',
    // timeout: 3000,
    error: function () {
        $('#blockMenuForUser').hide();
    },
    success: function (data) {
        console.log(data);
        $.each(data, function (i, user) {
            if (user.roles === "USER") {
                $('#menuUser').trigger('click');
                $('#main2').trigger('click');
                $('#blockMenuForAdmin').hide();
            }
            $('#userTable').append($('<tr>').append(
                $('<td>').append($('<span>')).text(user.id),
                $('<td>').append($('<span>')).text(user.username),
                $('<td>').append($('<span>')).text(user.lastname),
                $('<td>').append($('<span>')).text(user.age),
                $('<td>').append($('<span>')).text(user.email),
                $('<td>').append($('<span>')).text(user.roles)
            ))
        });
    }
    });
});
