define('user', ['capabilities'], function(capabilities) {

    var token;
    var settings = {};

    var save_to_ls = !capabilities.phantom;

    if (save_to_ls) {
        token = localStorage.getItem('user');
        settings = JSON.parse(localStorage.getItem('settings') || '{}');
    }

    function clear_token() {
        localStorage.removeItem('user');
        if ('email' in settings) {
            delete settings.email;
            save_settings();
        }
        token = null;
    }

    function get_setting(setting) {
        return settings[setting];
    }

    function set_token(new_token, new_settings) {
        if (!new_token) {
            return;
        }
        token = new_token;
        if (save_to_ls) {
            localStorage.setItem('user', token);
        }
        update_settings(new_settings);
    }

    function save_settings() {
        if (save_to_ls) {
            localStorage.setItem('settings', JSON.stringify(settings));
        }
    }

    function update_settings(data) {
        if (!data) {
            return;
        }
        _.extend(settings, data);
        save_settings();
    }

    return {
        clear_token: clear_token,
        get_setting: get_setting,
        get_token: function() {return token;},
        logged_in: function() {return !!token;},
        set_token: set_token,
        update_settings: update_settings
    };
});
