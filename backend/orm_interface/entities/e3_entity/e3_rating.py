from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, Float
from orm_interface.base import Base
from sqlalchemy.orm import relationship


class E3_Rating(Base):
 __tablename__ = "e3_rating"
 id = Column(Integer, primary_key=True, autoincrement=True)
 fairness = Column(Float)
 support = Column(Float)
 material = Column(Float)
 fun = Column(Float)
 comprehensibility = Column(Float)
 interesting = Column(Float)
 grade_effort = Column(Float)
 e3_course_id = Column(Integer, ForeignKey('e3_courses.id'))

 def __init__(self, fairness, support, 
    material, fun, comprehensibility, 
    interesting, grade_effort, e3_course_id ):

    self.fairness = fairness
    self.support = support
    self.material = material
    self.fun = fun
    self.comprehensibility = comprehensibility
    self.interesting = interesting
    self.grade_effort = grade_effort
    self.e3_course_id = e3_course_id  