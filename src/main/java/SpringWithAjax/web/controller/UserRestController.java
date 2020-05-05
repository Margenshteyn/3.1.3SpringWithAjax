package SpringWithAjax.web.controller;

import SpringWithAjax.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import SpringWithAjax.web.model.Role;
import SpringWithAjax.web.model.User;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@RestController
@RequestMapping("/api/")
public class UserRestController {

    private UserService userService;

    @Autowired
    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/admin/allUsers")
    public ResponseEntity<List<User>> getAllUsers() {
         return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @PostMapping("/admin/addUser")
    public void addUser(String email, String password, String firstname, String lastname, int age, String roles) {
        Set<Role> roleSet = userService.getRoleForUser(roles);
        userService.addUser(new User(email, password, firstname, lastname, age, roleSet));
    }

    @DeleteMapping("/admin/remove")
    public void removeUser(long id) {
        userService.removeUser(id);
    }

    @PutMapping("/admin/update")
    public void updateUser(long id, String email, String password, String firstname, String lastname, int age, String roles) {
//        password = userService.ifPasswordNull(id, password);
        Set<Role> roleSet = userService.getRoleForUser(roles);
        userService.updateUser(new User(id, email, password, firstname, lastname, age, roleSet));
    }

    @GetMapping(value = "/user/getUser")
    public ResponseEntity<List<User>> getUser(HttpSession session) {
        List<User> userList = new ArrayList<>();
        User user = (User) session.getAttribute("user");
        userList.add(user);
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }
/*    @GetMapping(value = {"/", "/login"})
    public String loginPage() {
        userService.addFirstAdminAndUser();
        return "login";
    }

    @GetMapping("/mainPage")
    public String getTable(Model model, HttpSession session) {
        model.addAttribute("user", session.getAttribute("user"));
        return "table";
    }*/
}