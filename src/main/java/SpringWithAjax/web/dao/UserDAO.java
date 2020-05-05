package SpringWithAjax.web.dao;

import SpringWithAjax.web.model.User;

import java.util.List;

public interface UserDAO {

    public List<User> getAllUsers();

    public void addUser(User user);

    public void updateUser(User user);

    public void removeUser(long id);

    public User getUserById(long id);

    public User getUserByEmail(String email);

    boolean userExist(String email);

}
