/* global $, Materialize, location */

function postForm(user_id, css) {
    var funct = $.ajax({
        dataType: "json",
        method: "POST",
        data: {"user_id": user_id, "css": css}
    });
    return funct.promise();
}

function deleteForm(user_id) {
    var funct = $.ajax({
        dataType: "json",
        method: "DELETE",
        data: {"user_id": user_id}
    });
    return funct.promise();
}

function patchForm(user_id, css) {
    var funct = $.ajax({
        dataType: "json",
        method: "PATCH",
        data: {"user_id": user_id, "css": css}
    });
    return funct.promise();
}

$(function() {
    $("#new_submit").click(function () {
        var user_id = $("#new_user_id").val();
        if (user_id.length < 1) {
            Materialize.toast("The user ID field can't be blank!", 2000);
            return;
        }
        var css_checked = $("#new_css_switch").is(':checked');
        var formPost = postForm(user_id, css_checked);
        formPost.done(function (data) {
            location.reload();
        });
        formPost.fail(function (data) {
            if (data.status == 409) {
                Materialize.toast('This user id already exists!', 10000);
            } else {
                Materialize.toast('Oh no! Something has failed submitting a new entry!', 10000);
            }
        });
    });
});

function delete_user(user_id) {
  var confirmation = confirm("Are you sure that you want to delete user?");
  if (confirmation) {
    var formDelete = deleteForm(user_id);
    formDelete.done(function (data) {
        location.reload();
    });
    formDelete.fail(function (data) {
        if (data.status == 409) {
            Materialize.toast('This user id does not exists!', 10000);
        } else {
            Materialize.toast('Oh no! Something has failed deleting this user entry!', 10000);
        }
    });
  }
}

function update_css_switch(user_id, element) {
    var css_checked = $(element).is(':checked');
    var formPatch = patchForm(user_id, css_checked);
    formPatch.done(function (data) {
        Materialize.toast('CSS updated!', 10000);
    });
    formPatch.fail(function (data) {
        if (data.status == 409) {
            Materialize.toast('This user id does not exists!', 10000);
        } else {
            Materialize.toast('Oh no! Something has failed changing the css toggle!', 10000);
        }
    });
}